from rest_framework import generics, permissions, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from django.db.models import Sum

from .models import FinancialRecord
from .serializers import FinancialRecordSerializer
from .permissions import RoleBasedPermission, IsOwnerOrAdmin

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5  
    page_size_query_param = 'page_size'
    max_page_size = 100

class FinancialRecordListCreateView(generics.ListCreateAPIView):
    serializer_class = FinancialRecordSerializer
    permission_classes = [RoleBasedPermission]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['category', 'notes']
    ordering_fields = ['date', 'amount']
    
    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return FinancialRecord.objects.all()
        return FinancialRecord.objects.filter(user = self.request.user)
    
    def perform_create(self, serializer):
        target_user = self.request.data.get('user', self.request.user.id)
        serializer.save(user_id=target_user)
        

class FinancialRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FinancialRecordSerializer
    permission_classes = [RoleBasedPermission, IsOwnerOrAdmin]
    
    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return FinancialRecord.objects.all()
        return FinancialRecord.objects.filter(user=self.request.user)
    

class FinanceSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        records = FinancialRecord.objects.filter(user=user)
        total_income = records.filter(type='INCOME').aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense = records.filter(type='EXPENSE').aggregate(Sum('amount'))['amount__sum'] or 0
        
        net_balance = total_income - total_expense
        
        return Response({
            "user": user.username,
            "total_income": total_income,
            "total_expense": total_expense,
            "net_balance": net_balance,
            "currency": "INR"
        })
        
    
class RecentTransactionsView(generics.ListAPIView):
    serializer_class = FinancialRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FinancialRecord.objects.filter(user=self.request.user).order_by('-created_at')[:5]