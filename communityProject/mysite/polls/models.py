from django.db import models


# Create your models here.

class Community(models.Model):
    community_id = models.CharField(max_length=10)
    community_name = models.CharField(max_length=100)
    community_desc = models.CharField(max_length=200)
    create_date = models.DateTimeField('date published')
    owner_id = models.CharField(max_length=10)


class Community_Tag(models.Model):
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)
    tag_id = models.CharField(max_length=10)
    tag_desc = models.CharField(max_length=100)


class Data_Type(models.Model):
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)
    data_type_id = models.CharField(max_length=10)
    data_type_name = models.CharField(max_length=100)
