from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:community_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:community_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:community_id>/vote/', views.vote, name='vote'),
]