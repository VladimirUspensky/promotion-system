from rest_framework import serializers
from django.contrib.auth.models import User

from ..models import InstagramAccount, InstagramOrder


class InstagramAccountSerializer(serializers.ModelSerializer):
    """"""
    class Meta:
        model = InstagramAccount
        fields = ('username', 'phone_number', 'email', 'password')


class InstagramOrderSerializer(serializers.ModelSerializer):
    """"""
    class Meta:
        model = InstagramOrder
        fields = ('client', 'likes_number', 'subscriptions_number',
                  'comments_number', 'unsubscribes_number', 'is_completed', 'created')


class UserSerializer(serializers.ModelSerializer):
    """"""
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}