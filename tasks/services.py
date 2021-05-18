from django.contrib.auth import get_user_model
from django_filters import rest_framework as filters
from .models import Task


TASK_STATUS_CHOICES = (
    ('done', 'Done'),
    ('in_process', 'In_process'),
    ('failed', 'Failed'),
    ('open', 'Open')
)

User = get_user_model()


class TaskFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='startswith')
    payment = filters.RangeFilter()
    status = filters.ChoiceFilter(choices=TASK_STATUS_CHOICES)
    deadline = filters.DateFilter(lookup_expr='gte')
    published_date = filters.DateFilter(lookup_expr='gte')

    class Meta:
        model = Task
        fields = ('title', 'payment', 'status', 'deadline', 'published_date', 'customer__email', 'performer__email')
