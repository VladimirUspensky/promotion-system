from django.urls import path, include

from .views import *


urlpatterns = [
    path('reviews/<int:pk>', ReviewRetrieveView.as_view()),
    path('reviews/update/<int:pk>', ReviewUpdateView.as_view()),
    path('reviews/all', ReviewListView.as_view()),
    path('reviews/new', ReviewCreateView.as_view()),

    path('customers/<int:pk>', CustomerRetrieveView.as_view()),
    path('customers/update/<int:pk>', CustomerUpdateView.as_view()),
    path('customers/all', CustomerListView.as_view()),
    path('customers/new', CustomerCreateView.as_view()),

    path('performers/<int:pk>', PerformerRetrieveView.as_view()),
    path('performers/update/<int:pk>', PerformerUpdateView.as_view()),
    path('performers/all', PerformerListView.as_view()),
    path('performers/new', PerformerCreateView.as_view()),

    path('tasks/<int:pk>', TaskRetrieveView.as_view()),
    path('tasks/update/<int:pk>', TaskUpdateView.as_view()),
    path('tasks/all', TaskListView.as_view()),
    path('tasks/new', TaskCreateView.as_view()),

    path('tags/<int:pk>', TagRetrieveView.as_view()),
    path('tags/update/<int:pk>', TagUpdateView.as_view()),
    path('tags/all', TagListView.as_view()),
    path('tags/new', TagCreateView.as_view()),

    path('deals/<int:pk>', DealRetrieveView.as_view()),
    path('deals/update/<int:pk>', DealUpdateView.as_view()),
    path('deals/all', DealListView.as_view()),
    path('deals/new', DealCreateView.as_view()),

    path('messages/<int:pk>', MessageRetrieveView.as_view()),
    path('messages/update/<int:pk>', MessageUpdateView.as_view()),
    path('messages/all', MessageListView.as_view()),
    path('messages/new', MessageCreateView.as_view()),
]
