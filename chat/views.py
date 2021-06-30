from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Chat
from .serializers import ChatSerializer


User = get_user_model()


class ChatDetailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ChatSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Chat.objects.filter(Q(creator=user) | Q(second_member=user))

        return queryset


class ChatDeleteView(DestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatUpdateView(UpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatCreateView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatSerializer

    def post(self, request, format=None):
        data = self.request.data
        from_user_id = data.get('from_user')
        to_user_id = data.get('to_user')
        from_user = User.objects.filter(id=from_user_id).first()
        to_user = User.objects.filter(id=to_user_id).first()
        chat = Chat()
        chat.name = str(from_user.id) + str(to_user.id)
        chat.save()

        chat.save()
        return Response({'Success': 'Chat created successfully'})
