from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReviewUserUpdateDeletePermission(BasePermission):
    message = 'Updating and Deleting are available for review owner only'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.from_user == request.user
