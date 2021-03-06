from rest_framework import routers
from django.urls import path, include

from .views import *


router = routers.SimpleRouter()


urlpatterns = [
    path('accounts/<int:pk>', InstagramAccountRetrieveView.as_view()),
    path('accounts/update/<int:pk>', InstagramAccountUpdateView.as_view()),
    path('accounts/all', InstagramAccountListView.as_view()),
    path('accounts/new', InstagramAccountCreateView.as_view()),

    path('tasks/<int:pk>', InstagramTaskRetrieveView.as_view()),
    path('tasks/update/<int:pk>', InstagramTaskUpdateView.as_view()),
    path('tasks/all', InstagramTaskListView.as_view()),
    path('tasks/new', InstagramTaskCreateView.as_view()),

]
urlpatterns += router.urls
