# Register your models here.

from django.contrib import admin

from .models import Community, Community_Tag, Data_Type

admin.site.register(Community)
admin.site.register(Community_Tag)
admin.site.register(Data_Type)
