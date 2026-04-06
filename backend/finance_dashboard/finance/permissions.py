from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class RoleBasedPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        
        if user.role == 'ADMIN':
            return True
        
        if user.role == 'ANALYST':
            if request.method in SAFE_METHODS:
                return True
            if request.method == 'POST':
                return True
            return False
        
        if user.role == 'VIEWER':
            return request.method in SAFE_METHODS
        return False

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        return obj.user == request.user