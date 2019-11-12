from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .services import *

# Create your views here.
def index(request):
    communityList = Community.objects.all()  # quering all Communities
    return render(request, "index.html", {"communityList": communityList})

def getCommunity(request,community_id):
    data = list(CommunityService.getCommunity(community_id))
    return JsonResponse(data, safe=False)


