from rest_framework import serializers
from .models import FinancialRecord

class FinancialRecordSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = FinancialRecord
        fields = [
            'id', 'user', 'user_name', 'amount', 'type', 'category', 'date', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']
    
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than 0")
        return value

    def validate_type(self, value):
        if value not in ['INCOME', 'EXPENSE']:
            raise serializers.ValidationError("Type must be INCOME or EXPENSE")
        return value