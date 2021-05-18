from rest_framework.serializers import ModelSerializer

from accounts.serializers import UserAccountSerializer
from notifications.models import Notification
from tasks.serializers import TaskSerializer


class NotificationSerializer(ModelSerializer):
    task = TaskSerializer()
    from_user = UserAccountSerializer()
    to_user = UserAccountSerializer()

    class Meta:
        fields = ('id', 'task', 'from_user', 'to_user', 'send_date', 'content', 'status', 'notification_type')
        model = Notification


class NotificationCreateSerializer(ModelSerializer):
    class Meta:
        fields = ('id', 'task', 'from_user', 'to_user', 'send_date', 'content', 'status', 'notification_type')
        model = Notification
