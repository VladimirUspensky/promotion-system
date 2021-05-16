from rest_framework.permissions import BasePermission, SAFE_METHODS


class TaskUserUpdateDeletePermission(BasePermission):
    message = 'Updating and Deleting the task are available for task customer only'

    def has_object_permission(self, request, view, obj):
        return True if request.method in SAFE_METHODS else obj.customer == request.user


class ReplyUserUpdateDeletePermission(BasePermission):
    message = 'Updating and Deleting the reply are available for reply owner only'

    def has_object_permission(self, request, view, obj):
        return True if request.method in SAFE_METHODS else obj.from_user == request.user
