from django.urls import path

from .views import (
    SignUpView,
    SignInView,
    UserAccountListView,
    UserAccountUpdateView,
    UserAccountDetailView
)

urlpatterns = [
    path('', UserAccountListView.as_view(), name='list'),
    path('update/<email>', UserAccountUpdateView.as_view(), name='update'),
    path('signup', SignUpView.as_view(), name='signup'),
    path('signin', SignInView.as_view(), name='signin'),
    path('<email>', UserAccountDetailView.as_view(), name='detail')
]
