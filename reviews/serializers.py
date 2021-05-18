from rest_framework import serializers

from tasks.serializers import TaskSerializer
from .models import Review
from accounts.serializers import UserAccountSerializer


class ReviewSerializer(serializers.ModelSerializer):
    to_user = UserAccountSerializer()
    from_user = UserAccountSerializer()
    task = TaskSerializer()

    class Meta:
        model = Review
        fields = ('id', 'to_user', 'from_user', 'task', 'content', 'mark')


class ReviewCreateUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('to_user', 'from_user', 'task', 'content', 'mark')

