from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from ..models import InstagramAccount, InstagramTask
from .serializers import InstagramAccountSerializer, InstagramTaskSerializer, UserSerializer, \
    CreateInstagramAccountSerializer, CreateInstagramTaskSerializer


class InstagramAccountRetrieveView(generics.RetrieveAPIView):
    queryset = InstagramAccount.objects.all()
    serializer_class = InstagramAccountSerializer


class InstagramAccountUpdateView(generics.UpdateAPIView):
    queryset = InstagramAccount.objects.all()
    serializer_class = InstagramAccountSerializer


class InstagramAccountCreateView(generics.CreateAPIView):
    queryset = InstagramAccount.objects.all()
    serializer_class = CreateInstagramAccountSerializer


class InstagramAccountListView(generics.ListAPIView):
    queryset = InstagramAccount.objects.all()
    serializer_class = InstagramAccountSerializer


class InstagramTaskRetrieveView(generics.RetrieveAPIView):
    queryset = InstagramTask.objects.all()
    serializer_class = InstagramTaskSerializer


class InstagramTaskUpdateView(generics.UpdateAPIView):
    queryset = InstagramTask.objects.all()
    serializer_class = CreateInstagramTaskSerializer


class InstagramTaskCreateView(generics.CreateAPIView):
    queryset = InstagramTask.objects.all()
    serializer_class = CreateInstagramTaskSerializer


class InstagramTaskListView(generics.ListAPIView):
    queryset = InstagramTask.objects.all()
    serializer_class = InstagramTaskSerializer
