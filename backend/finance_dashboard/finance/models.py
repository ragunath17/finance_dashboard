from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class FinancialRecord(models.Model):
    TYPE_CHOICES = (
        ('INCOME', 'Income'),
        ('EXPENSE', 'Expense')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='financial_records')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    category = models.CharField(max_length=50)
    date = models.DateField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.type} | {self.amount} | {self.user.username}"