from django.urls import path

from . import views

urlpatterns = [
    path('index', views.index),
    path('community/<int:community_id>', views.getCommunity)
]