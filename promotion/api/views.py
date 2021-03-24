from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView

from ..models import Review, Performer, Customer, Task, Tag, Deal, Message
from .serializers import *


class ReviewListView(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewRetrieveView(RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewUpdateView(UpdateAPIView):
    queryset = Review.objects.all()
    serializer_class = CreateReviewSerializer


class ReviewCreateView(CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = CreateReviewSerializer


class PerformerListView(ListAPIView):
    queryset = Performer.objects.all()
    serializer_class = PerformerSerializer


class PerformerRetrieveView(RetrieveAPIView):
    queryset = Performer.objects.all()
    serializer_class = PerformerSerializer


class PerformerUpdateView(UpdateAPIView):
    queryset = Performer.objects.all()
    serializer_class = CreatePerformerSerializer


class PerformerCreateView(CreateAPIView):
    queryset = Performer.objects.all()
    serializer_class = CreatePerformerSerializer


class CustomerListView(ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerRetrieveView(RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerUpdateView(UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CreateCustomerSerializer


class CustomerCreateView(CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CreateCustomerSerializer


class TaskListView(ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        params = self.request.query_params
        payment = params.get('payment', None)
        customer = params.get('customer', None)
        if payment:
            queryset = queryset.filter(payment__lte=payment)
        if customer:
            queryset = queryset.filter(customer__id=customer)
        return queryset


class TaskRetrieveView(RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskUpdateView(UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = CreateTaskSerializer


class TaskCreateView(CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = CreateTaskSerializer


class TagListView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagRetrieveView(RetrieveAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagUpdateView(UpdateAPIView):
    queryset = Tag.objects.all()
    serializer_class = CreateTagSerializer


class TagCreateView(CreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = CreateTagSerializer


class DealListView(ListAPIView):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer


class DealRetrieveView(RetrieveAPIView):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer


class DealUpdateView(UpdateAPIView):
    queryset = Deal.objects.all()
    serializer_class = CreateDealSerializer


class DealCreateView(CreateAPIView):
    queryset = Deal.objects.all()
    serializer_class = CreateDealSerializer


class MessageListView(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class MessageRetrieveView(RetrieveAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class MessageUpdateView(UpdateAPIView):
    queryset = Message.objects.all()
    serializer_class = CreateMessageSerializer


class MessageCreateView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = CreateMessageSerializer
