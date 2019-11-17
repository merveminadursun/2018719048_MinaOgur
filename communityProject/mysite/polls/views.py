from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, Http404, HttpResponseRedirect
from .services import *
import json
import datetime


# Create your views here.
def index(request):
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

@csrf_exempt
def newCommunity(request):
    if request.method == "POST":
        cmn = Community()
        cmn.community_name = request.POST.get("com_name", "")
        cmn.community_desc = request.POST.get("com_description", "")
        cmn.create_date    = timezone.now()
        cmn.owner_id       = 1
        join_allowed       = request.POST.get("com_joinallow", "")
        if join_allowed == 'on':
            cmn.join_allowed = True
        else:
            cmn.join_allowed = False
        newdt_allowed      = request.POST.get("com_editdtallow", "")
        if newdt_allowed == 'on' :
            cmn.newdt_allowed = True
        else:
            newdt_allowed = False
        cmn.save()
        return HttpResponse(cmn.pk)
    else:
        return render(request, "newCommunity.html", {})

def login(request, id):
    data = list(UserService.login(id))
    return JsonResponse(data,safe=False)

def getCommunity(request,id):
    communityDetail = get_object_or_404(Community, pk=id)
    communityDataTypes = DataType.objects.filter(community=id)
    return render(request, "communityDetail.html", {"communityDetail": communityDetail,
                                                    "communityDataTypes": communityDataTypes })


def getCommunityMembers(request,url):
    data = list(CommunityService.getCommunityMembers(url))
    return JsonResponse(data, safe=False)

def getCommunityDataTypes(request,url):
    data = list(CommunityService.getCommunityDataTypes(url))
    return JsonResponse(data, safe=False)

def getCommunityDataFields(request,url):
    data = list(CommunityService.getCommunityDataFields(url))
    return JsonResponse(data, safe=False)



