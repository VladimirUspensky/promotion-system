from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import permissions

from .serializers import ReviewSerializer, ReviewCreateUpdateDeleteSerializer
from .permissions import ReviewUserUpdateDeletePermission
from .models import Review


class ReviewListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewCreateView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Review.objects.all()
    serializer_class = ReviewCreateUpdateDeleteSerializer


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
