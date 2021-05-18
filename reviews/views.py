from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from tasks.models import Task
from .serializers import ReviewSerializer, ReviewCreateUpdateDeleteSerializer
from .permissions import ReviewUserUpdateDeletePermission
from .models import Review


User = get_user_model()


class ReviewListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewCreateView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ReviewCreateUpdateDeleteSerializer

    def post(self, request, format=None):
        data = self.request.data
        from_user_id = data.get('from_user')
        to_user_id = data.get('to_user')
        task_id = data.get('task')
        from_user = User.objects.filter(id=from_user_id).first()
        to_user = User.objects.filter(id=to_user_id).first()
        task = Task.objects.filter(id=task_id).first()
        queryset = Review.objects.filter(from_user_id=from_user_id, to_user_id=to_user_id, task_id=task_id)
        if queryset:
            return Response({'Failed': 'It is impossible to send more than one review related to the one task'})
        review = Review.objects.create(from_user=from_user,
                                       to_user=to_user,
                                       task=task,
                                       content=data.get('content'),
                                       mark=data.get('mark'))
        review.save()
        serializer = ReviewSerializer(review)
        return Response(serializer.data)


class ReviewRetrieveView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewUpdateDeleteView(UpdateAPIView,
                             DestroyAPIView,
                             ReviewUserUpdateDeletePermission):
    permission_classes = (ReviewUserUpdateDeletePermission,)
    queryset = Review.objects.all()
    serializer_class = ReviewCreateUpdateDeleteSerializer
