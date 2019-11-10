from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def detail(request, community_id):
    return HttpResponse("You're looking at community %s." % community_id)

def results(request, community_id):
    response = "You're looking at the results of community %s."
    return HttpResponse(response % community_id)

def vote(request, community_id):
    return HttpResponse("You're voting on community %s." % community_id)
