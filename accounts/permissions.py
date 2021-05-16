from rest_framework.permissions import BasePermission, SAFE_METHODS


class UserAccountUpdatePermission(BasePermission):
    message = 'Updating he profile is available for profile owner only'

    def has_object_permission(self, request, view, obj):
        return True if request.method in SAFE_METHODS else obj.id == request.user.id
