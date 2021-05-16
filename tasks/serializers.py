from rest_framework import serializers

from .models import Task, Reply
from accounts.serializers import UserAccountSerializer


class ReplySerializer(serializers.ModelSerializer):
    from_user = UserAccountSerializer()

    class Meta:
        model = Reply
        fields = ('task', 'from_user', 'content', 'send_date')


class ReplyCreateUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('task', 'from_user', 'content', 'send_date')


class TaskSerializer(serializers.ModelSerializer):
    customer = UserAccountSerializer()
    performer = UserAccountSerializer()
    replies = ReplySerializer(many=True)

    class Meta:
        model = Task
        fields = ('id', 'slug', 'title', 'description', 'deadline', 'published_date',
                  'status', 'payment', 'customer', 'performer', 'replies')


class TaskCreateUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('slug', 'title', 'description', 'deadline', 'status', 'payment', 'customer')
