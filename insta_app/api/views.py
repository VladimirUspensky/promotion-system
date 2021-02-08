from rest_framework import viewsets
from django.contrib.auth.models import User
from ..models import InstagramAccount, InstagramOrder
from .serializers import InstagramAccountSerializer, InstagramOrderSerializer, UserSerializer


class InstagramAccountViewSet(viewsets.ModelViewSet):
    queryset = InstagramAccount.objects.all()
    serializer_class = InstagramAccountSerializer


class InstagramOrderViewSet(viewsets.ModelViewSet):
    queryset = InstagramOrder.objects.all()
    serializer_class = InstagramOrderSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


