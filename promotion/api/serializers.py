from django.contrib.auth.models import User
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer

from ..models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']


class ReviewSerializer(ModelSerializer):
    to_user = UserSerializer()
    from_user = UserSerializer()

    class Meta:
        model = Review
        fields = ['to_user', 'from_user', 'content', 'grade']


class CreateReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = ['to_user', 'from_user', 'content', 'grade']


class PerformerSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Performer
        fields = ['user', 'rate', 'average_grade', 'solved_tasks_num', 'failed_tasks_num']


class CreatePerformerSerializer(ModelSerializer):
    class Meta:
        model = Performer
        fields = ['user', 'rate', 'average_grade', 'solved_tasks_num', 'failed_tasks_num']


class CustomerSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['user', 'rate', 'average_grade', 'all_tasks_num']


class CreateCustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['user', 'rate', 'average_grade', 'all_tasks_num']


class TaskSerializer(ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = Task
        fields = ['customer', 'name', 'description', 'payment', 'deadline']


class CreateTaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['customer', 'name', 'description', 'payment', 'deadline']


class TagSerializer(ModelSerializer):
    task = TaskSerializer()

    class Meta:
        model = Tag
        fields = ['name', 'task']


class CreateTagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'task']


class DealSerializer(ModelSerializer):
    performer = PerformerSerializer()
    customer = CustomerSerializer()
    task = TaskSerializer()

    class Meta:
        fields = ['performer', 'customer', 'task', 'start_deal', 'emd_deal']


class CreateDealSerializer(ModelSerializer):
    class Meta:
        fields = ['performer', 'customer', 'task', 'start_deal', 'emd_deal']


class MessageSerializer(ModelSerializer):
    performer = PerformerSerializer()
    customer = CustomerSerializer()

    class Meta:
        model = Message
        fields = ['performer', 'customer', 'content', 'send_date', 'is_edited']


class CreateMessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ['performer', 'customer', 'content', 'send_date', 'is_edited']
