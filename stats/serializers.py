from rest_framework import serializers

from .models import Stats
from accounts.models import UserAccount


class StatsSerializer(serializers.ModelSerializer):
    user_account = UserAccount

    class Meta:
        model = Stats
        fields = '__all__'


class StatsCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = '__all__'
