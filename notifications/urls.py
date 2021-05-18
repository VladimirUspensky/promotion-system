from django.urls import path

from notifications.views import (
    NotificationListAPIView,
    NotificationCreateAPIView,
    NotificationDeleteAPIView,
    NotificationUpdateAPIView
)

urlpatterns = [
    path('', NotificationListAPIView.as_view()),
    path('create', NotificationCreateAPIView.as_view()),
    path('delete/<pk>', NotificationDeleteAPIView.as_view()),
    path('update/<pk>', NotificationUpdateAPIView.as_view())
]
