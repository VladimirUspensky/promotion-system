from rest_framework import serializers
from django.contrib.auth.models import User

from ..models import InstagramAccount, InstagramTask


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class InstagramAccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = InstagramAccount
        fields = ('user', 'username', 'phone_number', 'email', 'password')


class CreateInstagramAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramAccount
        fields = ('user', 'username', 'phone_number', 'email', 'password')


class InstagramTaskSerializer(serializers.ModelSerializer):
    account = InstagramAccountSerializer()

    class Meta:
        model = InstagramTask
        fields = ('account', 'likes_number', 'subscriptions_number', 'comments_number',
                  'comments_content', 'unsubscribes_number', 'is_completed', 'created')


class CreateInstagramTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramTask
        fields = ('account', 'likes_number', 'subscriptions_number', 'comments_number',
                  'comments_content', 'unsubscribes_number', 'is_completed', 'created')
