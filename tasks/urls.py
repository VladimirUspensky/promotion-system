from django.urls import path
from .views import (
    TaskListView,
    TaskRetrieveView,
    TaskSearchView,
    TaskCreateView,
    TaskUpdateView,
    ReplyCreateView,
    ReplyListView,
    TaskDeleteView
)

urlpatterns = [
    path('', TaskListView.as_view(), name='task_list'),
    path('reply/create', ReplyCreateView.as_view(), name='reply_create'),
    path('reply', ReplyListView.as_view(), name='reply_list'),
    path('create', TaskCreateView.as_view(), name='task_create'),
    path('search', TaskSearchView.as_view(), name='task_search'),
    path('update/<slug>', TaskUpdateView.as_view(), name='task_update'),
    path('delete/<slug>', TaskDeleteView.as_view(), name='task_delete'),
    path('<slug>', TaskRetrieveView.as_view(), name='task_detail')
]

