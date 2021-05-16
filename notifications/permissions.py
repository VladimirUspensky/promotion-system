from rest_framework.permissions import BasePermission


class NotificationDeleteUpdatePermission(BasePermission):
    message = 'Deleting and Updating notifications are available to whom it is addressed'

    def has_object_permission(self, request, view, obj):
        return True if obj.to_user == request.user else False
