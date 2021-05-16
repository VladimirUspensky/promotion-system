from rest_framework import permissions
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from notifications.models import Notification
from notifications.serializers import NotificationSerializer, NotificationCreateSerializer
from notifications.permissions import NotificationDeleteUpdatePermission


class NotificationListAPIView(APIView):
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        to_user = self.request.data.get('to_user')
        if not to_user:
            return Response({'None': 'There are no notifications'})
        queryset = Notification.objects.filter(to_user=to_user)
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer)


class NotificationCreateAPIView(CreateAPIView):
    serializer_class = NotificationCreateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Notification.objects.all()


class NotificationDeleteUpdateAPIView(DestroyAPIView, UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = (NotificationDeleteUpdatePermission,)
    queryset = Notification.objects.all()
