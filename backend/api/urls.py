from django.urls import path
from . import views

urlpatterns = [
    path("trackers/", views.TrackerListCreate.as_view(), name="tracker-list"),
    path("trackers/delete/<int:pk>/", views.TrackerDelete.as_view(), name="delete-tracker"),
]
