from rest_framework import permissions
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Stats
from .serializers import StatsSerializer, StatsCreateUpdateSerializer


class StatsListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Stats.objects.all()
    serializer_class = StatsSerializer


class StatsRetrieveView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Stats.objects.all()
    serializer_class = StatsSerializer


class StatsCreateView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Stats.objects.all()
    serializer_class = StatsCreateUpdateSerializer
