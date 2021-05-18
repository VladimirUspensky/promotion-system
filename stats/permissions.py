from rest_framework.permissions import BasePermission


class StatsUpdatePermission(BasePermission):
    message = ''

    def has_object_permission(self, request, view, obj):
        return True if obj.user_account == request.user else False


class RetrieveStatsPermission(BasePermission):
    message = 'Retrieving personal stats is available for stats owner only'

    def has_object_permission(self, request, view, obj):
        return True if obj.user_account == request.user else False
