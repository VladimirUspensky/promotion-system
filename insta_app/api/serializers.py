from rest_framework import serializers

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


