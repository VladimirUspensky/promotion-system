from django.urls import path

from .views import ReviewListView, ReviewUpdateDeleteView, ReviewRetrieveView, ReviewCreateView


urlpatterns = [
    path('', ReviewListView.as_view()),
    path('create', ReviewCreateView.as_view()),
    path('update/<pk>', ReviewUpdateDeleteView.as_view()),
    path('delete/<pk>', ReviewUpdateDeleteView.as_view()),
    path('<pk>', ReviewRetrieveView.as_view())
]

