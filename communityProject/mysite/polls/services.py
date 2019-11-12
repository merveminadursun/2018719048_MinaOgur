from .models import *

class UserService:
    def login(data):
        return User.objects.values()

class CommunityService:
    def getCommunity(community_id):
        return Community.objects.filter(id=community_id).values()