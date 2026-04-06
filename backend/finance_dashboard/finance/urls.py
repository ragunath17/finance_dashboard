from django.urls import path
from .views import FinancialRecordListCreateView, FinancialRecordDetailView, FinanceSummaryView, RecentTransactionsView

urlpatterns = [
    path('records/', FinancialRecordListCreateView.as_view(), name="record-list"),
    path('records/<int:pk>/', FinancialRecordDetailView.as_view(), name="record-detail"),
    
    path('summary/', FinanceSummaryView.as_view(), name="finance-summary"),
    path('recent-transactions/', RecentTransactionsView.as_view(), name="recent-transactions"),
]
