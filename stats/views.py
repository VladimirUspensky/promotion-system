from rest_framework import permissions
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Stats
from .permissions import RetrieveStatsPermission
from .serializers import StatsSerializer, StatsCreateUpdateSerializer


class StatsListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Stats.objects.all()
    serializer_class = StatsSerializer


class RetrieveStatsView(APIView):
    permission_classes = (RetrieveStatsPermission,)
    serializer_class = StatsSerializer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Stats.objects.all()
        queryset = queryset.filter(user_account=user).first()
        serializer = StatsSerializer(queryset)
        return Response(serializer.data)


class StatsCreateView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Stats.objects.all()
    serializer_class = StatsCreateUpdateSerializer

