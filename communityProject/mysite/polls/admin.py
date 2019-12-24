# Register your models here.

from django.contrib import admin

from .models import Community, DataType, CommunityTag, MyUser, UserRole, CommunityFollower, FormField, Post, \
    UserBuilderRequest

admin.site.register(Community)
admin.site.register(DataType)
admin.site.register(CommunityTag)
admin.site.register(MyUser)
admin.site.register(UserRole)
admin.site.register(CommunityFollower)
admin.site.register(FormField)
admin.site.register(Post)
admin.site.register(UserBuilderRequest)
