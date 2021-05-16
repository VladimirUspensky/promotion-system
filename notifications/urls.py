from django.urls import path

from notifications.views import NotificationListAPIView, NotificationCreateAPIView, NotificationDeleteUpdateAPIView

urlpatterns = [
    path('', NotificationListAPIView.as_view()),
    path('create', NotificationCreateAPIView.as_view()),
    path('delete', NotificationDeleteUpdateAPIView.as_view())
]
