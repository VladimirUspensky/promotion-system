from django.urls import path

from stats.views import RetrieveStatsView

urlpatterns = [
    path('detail', RetrieveStatsView.as_view())
]
