from rest_framework import permissions
from rest_framework.mixins import UpdateModelMixin
from rest_framework.views import APIView
from rest_framework.response import Response
from django.template.defaultfilters import slugify
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
    UpdateAPIView
)
from .serializers import (
    TaskSerializer,
    TaskCreateUpdateDeleteSerializer,
    ReplyCreateUpdateDeleteSerializer,
    ReplySerializer
)
from .models import Task, Reply
from .services import TaskFilter
from .permissions import TaskUserUpdateDeletePermission, ReplyUserUpdateDeletePermission


class TaskListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TaskFilter


class TaskRetrieveView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'slug'


class TaskCreateView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskCreateUpdateDeleteSerializer


class TaskDeleteView(DestroyAPIView):
    permission_classes = (TaskUserUpdateDeletePermission,)
    queryset = Task.objects.all()
    serializer_class = TaskCreateUpdateDeleteSerializer
    lookup_field = 'slug'


class TaskUpdateView(UpdateAPIView,
                     UpdateModelMixin,
                     TaskUserUpdateDeletePermission):
    permission_classes = (TaskUserUpdateDeletePermission,)
    queryset = Task.objects.all()
    serializer_class = TaskCreateUpdateDeleteSerializer
    lookup_field = 'slug'

    def put(self, request, *args, **kwargs):
        title = self.request.data.get('title')
        if title:
            new_slug = slugify(title)
            self.request.data['slug'] = new_slug
        return self.partial_update(request, *args, **kwargs)


class TaskSearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TaskSerializer

    def post(self, request, format=None):
        queryset = Task.objects.all()
        data = self.request.data
        status = data['status']
        queryset = queryset.filter(status__iexact=status)
        payment = data['payment']
        queryset = queryset.filter(payment__gte=payment)

        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)


class ReplyCreateAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TaskSerializer

    def post(self, request, format=None):
        data = self.request.data
        task = Task.objects.filter(id=data['task']).first()
        if task.status == 'open':
            reply = Reply.objects.create(data['task'],
                                         data['from_user'],
                                         data['content'],
                                         data['send_date'])
            reply.save()
            return Response({'Success': 'Reply created successfully'})
        else:
            return Response({'Fail': 'Task is not opened'})


class ReplyListView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ReplySerializer

    def post(self, request, format=None):
        queryset = Reply.objects.all()
        data = self.request.data
        task = data['task']
        queryset = queryset.filter(task__slug__iexact=task)
        serializer = ReplySerializer(queryset, many=True)
        return Response(serializer.data)


class ReplyCreateView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Reply.objects.all()
    serializer_class = ReplyCreateUpdateDeleteSerializer


class ReplyUpdateDeleteView(UpdateAPIView,
                            DestroyAPIView,
                            ReplyUserUpdateDeletePermission):
    permission_classes = (ReplyUserUpdateDeletePermission,)
    serializer_class = ReplySerializer
    queryset = Reply.objects.all()
