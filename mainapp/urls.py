from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('add/', views.add_song, name='add_song'),  # URL for the song upload form
]