from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def detail(request, community_name):
    return HttpResponse("You're looking at community %s." % community_name)

def results(request, community_name):
    response = "You're looking at the results of community %s."
    return HttpResponse(response % community_name)

def vote(request, community_name):
    return HttpResponse("You're voting on community %s." % community_name)



