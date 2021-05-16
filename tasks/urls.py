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
    path('', TaskListView.as_view()),
    path('reply/create', ReplyCreateView.as_view()),
    path('reply', ReplyListView.as_view()),
    path('create', TaskCreateView.as_view()),
    path('search', TaskSearchView.as_view()),
    path('update/<slug>', TaskUpdateView.as_view()),
    path('delete/<slug>', TaskDeleteView.as_view()),
    path('<slug>', TaskRetrieveView.as_view())
]
