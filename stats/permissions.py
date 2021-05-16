from rest_framework.permissions import BasePermission


class StatsUpdatePermission(BasePermission):
    message = ''

    def has_object_permission(self, request, view, obj):
        if obj.user_account == request.user:
            return True
        return False
