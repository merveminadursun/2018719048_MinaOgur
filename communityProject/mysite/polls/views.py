from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .services import *
import json


# Create your views here.
def index(request):
    print("hello")
    communityList = Community.objects.all()  # quering all Communities
    return render(request, "index.html", {"communityList": communityList})

@csrf_exempt
def signup(request):
    usr = User()
    usr.username = request.POST.get("username", "")
    usr.password = request.POST.get("password", "")
    usr.email = request.POST.get("email", "")
    role = UserRole(id = 3) # defaulyt user role shoul be 3 = default user role
    usr.role = role
    usr.save()
    return HttpResponse(usr.pk)

def login(request, id):
    data = list(UserService.login(id))
    return JsonResponse(data,safe=False)

def getCommunity(request,url):
    data = list(CommunityService.getCommunity(url))
    return JsonResponse(data, safe=False)

def getCommunityMembers(request,url):
    data = list(CommunityService.getCommunityMembers(url))
    return JsonResponse(data, safe=False)

def getCommunityDataTypes(request,url):
    data = list(CommunityService.getCommunityDataTypes(url))
    return JsonResponse(data, safe=False)

def getCommunityDataFields(request,url):
    data = list(CommunityService.getCommunityDataFields(url))
    return JsonResponse(data, safe=False)



