from django.urls import path, include

from . import views

urlpatterns = [
    path('login/<id>/', views.login),
    path('signup/', views.signup),
    path('c/<url>/', include([
        path('', views.getCommunity),
        path('members/', views.getCommunityMembers),
        path('datatypes/', views.getCommunityDataTypes),
        path('datafields/', views.getCommunityDataFields)
    ])
    )
]
