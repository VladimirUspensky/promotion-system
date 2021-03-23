from rest_framework.viewsets import ModelViewSet

from ..models import Review, Performer, Customer, Task, Tag, Deal, Message
from .serializers import ReviewSerializer, PerformerSerializer, CustomerSerializer, TaskSerializer, TagSerializer, \
    DealSerializer, MessageSerializer


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class PerformerViewSet(ModelViewSet):
    queryset = Performer.objects.all()
    serializer_class = PerformerSerializer


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class DealViewSet(ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
