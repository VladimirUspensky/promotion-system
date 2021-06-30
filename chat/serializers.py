from rest_framework import serializers

from accounts.serializers import UserAccountSerializer
from .models import Message, Chat


class MessageReceiveSerializer(serializers.ModelSerializer):
    from_user = UserAccountSerializer()
    to_user = UserAccountSerializer()

    class Meta:
        model = Message
        fields = ('from_user', 'to_user', 'content', 'send_date', 'is_read')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('from_user', 'to_user', 'content', 'send_date', 'is_read')


class ChatSerializer(serializers.ModelSerializer):
    creator = UserAccountSerializer()
    second_member = UserAccountSerializer()

    class Meta:
        model = Chat
        fields = ('id', 'name', 'creator', 'second_member', 'messages')

