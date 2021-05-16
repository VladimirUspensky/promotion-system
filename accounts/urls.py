from django.urls import path

from .views import (
    SignUpView,
    SignInView,
    UserAccountListView,
    UserAccountUpdateView,
    UserAccountDetailView
)

urlpatterns = [
    path('', UserAccountListView.as_view()),
    path('update/<email>', UserAccountUpdateView.as_view()),
    path('signup', SignUpView.as_view()),
    path('signin', SignInView.as_view()),
    path('<email>', UserAccountDetailView.as_view())
]
