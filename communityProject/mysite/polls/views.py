from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, Http404, HttpResponseRedirect, HttpResponseNotFound
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from .services import *
from django.core import serializers
from django.core.files.storage import default_storage
import json
import datetime
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.models import User

class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, 'json'):
            return str(obj)
        return super().default(obj)


# Create your views here.
def index(request):
    # communityList = Community.objects.all()  # quering all Communities
    communityList = Community.objects.filter(active=True).order_by("-create_date")  # quering all Communities
    return render(request, "index.html", {"communityList": communityList})


@csrf_exempt
def my_signup(request):

    # At this point, user is a User object that has already been saved
    # to the database. You can continue to change its attributes
    # if you want to change other fields.
    # I will change it user profile page.
    usr = MyUser()
    usr.username = request.POST.get("username", "")
    usr.password = request.POST.get("password", "")
    usr.email = request.POST.get("email", "")
    role = UserRole(id=3)  # default user role shoul be 3 = default user role
    usr.role = role
    usr.save()
    User.objects.create_user(usr.username , usr.email, usr.password)
    user = authenticate(username=usr.username, password=usr.password)
    # login(request, user)
    if user is not None:
        login(request, user)
        return JsonResponse(usr.username, safe=False)
    else:
        return HttpResponseNotFound("user is not none")
    # return HttpResponse(usr.pk)



# Begin Of Login + Register
@csrf_exempt
def my_login(request):
    email = request.POST.get("email", "")
    password = request.POST.get("password", "")
    data = get_object_or_404(UserService.login(email, password))
    print("====================")
    print(data)
    if (data == []):
        return HttpResponseNotFound("Account Not Found")
    else:
        # Set a session value
        request.session['user_id'] = data["id"]
        # Set session as modified to force data updates/cookie to be saved.
        request.session.modified = True

        user = authenticate(request, username=data["username"], password=data["password"])
        if user is not None:
            login(request, user)
            return JsonResponse(data, safe=False)
        else:
            return HttpResponseNotFound("user is not none")

def my_logout(request):
    logout(request)

@csrf_exempt
def check_username(request):
    username = request.POST.get("username", "")
    user_exist = MyUser.objects.filter(username=username).only("username")
    print("=================")
    print(len(user_exist))
    if len(user_exist) == 0:
        return HttpResponse("You can create, go on!")
    else:
        return HttpResponseNotFound("This user name was taken already!")


# End Of Login + Register
@csrf_exempt
def newCommunity(request):
    if request.method == "POST":
        cmn = Community()
        usr = MyUser()
        usr.id = 1
        cmn.community_name = request.POST.get("com_name", "")
        cmn.community_desc = request.POST.get("com_description", "")
        cmn.create_date = timezone.now()
        print(request.user)
        cmn.owner = MyUser.objects.get(username=request.user)
        join_allowed = request.POST.get("com_joinallow", "")
        if join_allowed == 'on':
            cmn.join_allowed = True
        else:
            cmn.join_allowed = False
        newdt_allowed = request.POST.get("com_editdtallow", "")
        if newdt_allowed == 'on':
            cmn.newdt_allowed = True
        else:
            newdt_allowed = False
        cmn.save()
        # return HttpResponse(cmn.pk)

        tagsJson = request.POST.get('tagsJson')
        cmn_tag = CommunityTag()
        cmn_tag.community = cmn
        cmn_tag.tag_info = tagsJson
        cmn_tag.save()

        #Generic Data Type creation
        dt = DataType()
        dt.community = Community.objects.get(pk=cmn.id)
        dt.data_type_name = "Generic Post"
        dt.data_type_desc = "Here is a generic post for your basic posts in the community!"
        print(request.user)
        dt.owner = MyUser.objects.get(username=request.user)
        dt.save()
        return redirect("/")
    else:
        return render(request, "newCommunity.html", {})


@csrf_exempt
def newDataType(request):
    if request.method == "POST":
        fieldJson = request.POST.get('fieldJson')
        communityId = request.POST.get("communityId", "")
        dt = DataType()
        dt.community = Community.objects.get(pk=communityId)
        dt.data_type_name = request.POST.get("dt_name", "")
        dt.data_type_desc = request.POST.get("dt_description", "")
        dt.owner = MyUser.objects.get(pk=1)
        dt.formfields = fieldJson
        dt.save()
        # return HttpResponse(dt.pk)
        return redirect('/community/' + communityId)


@csrf_exempt
def deactivateCommunity(request):
    communityId = request.POST.get("communityId", "")
    community = Community.objects.get(id=communityId)
    community.active = False
    community.save()
    return JsonResponse(communityId, safe=False)


@csrf_exempt
def newPost(request, cmn_id, dt_id):
    community = get_object_or_404(Community, pk=cmn_id)
    data_type = get_object_or_404(DataType, pk=dt_id)
    tmpObj = serializers.serialize("json", DataType.objects.filter(pk=dt_id).only("formfields"))
    formFields = json.loads(tmpObj)
    return render(request, "newPost.html", {"community": community,
                                            "data_type": data_type,
                                            "formFields": formFields})


@csrf_exempt
def createNewPost(request):
    formData = json.loads(request.POST.get("formFields", ""))
    formDataDict = json.dumps(formData[0]["fields"])
    formFieldsData = json.loads(formDataDict)
    formFields = formFieldsData["formfields"]

    pt = Post()
    pt.community = Community.objects.get(pk=formFieldsData["community"])
    pt.data_type = DataType.objects.get(pk=json.dumps(formData[0]["pk"]))
    pt.post_name = request.POST.get("post_name", "")
    pt.post_desc = request.POST.get("post_desc", "")
    pt.post_data = formFields
    pt.owner = MyUser.objects.get(pk=1)
    pt.create_date = timezone.now()
    pt.save()
    return HttpResponse(request)


def getPost(request, id):
    # print(id)
    postDetail = Post.objects.filter(id=id)
    print("===================================================")
    print(dir(postDetail))
    # tmpObj = serializers.serialize("json", CommunityTag.objects.filter(community_id=id).only("tag_info"))
    return render(request, "newPost.html", {"postDetail": postDetail})


def getCommunity(request, id):
    communityDetail = get_object_or_404(Community, pk=id)
    communityDataTypes = DataType.objects.filter(community=id)
    communityPosts = Post.objects.filter(community=id)
    print(CommunityTag.objects.filter(community_id=id))
    tmpObj = serializers.serialize("json", CommunityTag.objects.filter(community_id=id).only("tag_info"))
    communityTags = json.loads(tmpObj)
    # communityTags = JsonResponse({"tags": json.dumps(CommunityTag.objects.filter(community_id=id))}, safe=False)
    return render(request, "communityDetail.html", {"communityDetail": communityDetail,
                                                    "communityDataTypes": communityDataTypes,
                                                    "communityTags": communityTags,
                                                    "communityPosts": communityPosts})


def getCommunityMembers(request, url):
    data = list(CommunityService.getCommunityMembers(url))
    return JsonResponse(data, safe=False)


def getCommunityDataTypes(request, url):
    data = list(CommunityService.getCommunityDataTypes(url))
    return JsonResponse(data, safe=False)


def getCommunityDataFields(request, url):
    data = list(CommunityService.getCommunityDataFields(url))
    return JsonResponse(data, safe=False)


@csrf_exempt
def tags(request):
    query = request.POST.get("query", "")
    data = WikidataService.query(query)
    return JsonResponse(data, safe=False)

@csrf_exempt
def save_files(request):
    #  Saving POST'ed file to storage
    file = request.FILES.get('myfile')
    file_name = default_storage.save(file.name, file)
    #  Reading file from storage
    file_url = default_storage.url(file_name) #use file_url for reading
    return JsonResponse(file_url, safe=False)
