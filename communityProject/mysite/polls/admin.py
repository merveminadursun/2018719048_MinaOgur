# Register your models here.

from django.contrib import admin

from .models import Community, DataType, CommunityTag, User, UserRole, CommunityFollower, FormField, \
    UserBuilderRequest

admin.site.register(Community)
admin.site.register(DataType)
admin.site.register(CommunityTag)
admin.site.register(User)
admin.site.register(UserRole)
admin.site.register(CommunityFollower)
admin.site.register(FormField)
admin.site.register(UserBuilderRequest)
