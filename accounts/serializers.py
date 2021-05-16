from rest_framework import serializers

from stats.serializers import StatsSerializer
from .models import UserAccount


class UserAccountSerializer(serializers.ModelSerializer):
    stats = StatsSerializer(read_only=True)

    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'phone', 'first_name', 'last_name', 'stats')
