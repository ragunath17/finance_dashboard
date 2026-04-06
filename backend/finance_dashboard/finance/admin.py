from django.contrib import admin
from .models import FinancialRecord

@admin.register(FinancialRecord)
class FinancialRecordAdmin(admin.ModelAdmin):
    list_display = ('date', 'user', 'type', 'category', 'amount')
    list_filter = ('type', 'category', 'date')
    search_fields = ('category', 'notes', 'user__username')
    ordering = ('-date',)