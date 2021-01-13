from rest_framework import viewsets

from ..models import InstagramAccount, InstagramOrder
from .serializers import InstagramAccountSerializer, InstagramOrderSerializer


class InstagramAccountViewSet(viewsets.ModelViewSet):
    queryset = InstagramAccount.objects.all()
    serializer_class = InstagramAccountSerializer


class InstagramOrderViewSet(viewsets.ModelViewSet):
    queryset = InstagramOrder.objects.all()
    serializer_class = InstagramOrderSerializer




