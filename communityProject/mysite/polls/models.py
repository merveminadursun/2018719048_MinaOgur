import datetime
from django.db import models
from django.utils import timezone
from enum import Enum
from django.forms import ModelForm
from django.contrib.postgres.fields import JSONField

# Create your models here.

class UserRole(models.Model):
    roledesc = models.CharField(max_length=20)

    def __str__(self):
        return "%s" % (self.roledesc)

class Gender(Enum):  # A subclass of Enum
    F = "Female"
    M = "Male"
    @classmethod
    def all(self):
        return [Gender.F, Gender.M]

class MyUser(models.Model):
    username = models.CharField(max_length=20)
    first_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50, default="")
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE)
    location = models.CharField(max_length=140)
    gender = models.CharField(max_length=1, choices=[(tag.name, tag.value) for tag in Gender])
    password = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pics', blank=True)

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)


# class UserForm(ModelForm):
#     class Meta:
#         model = MyUser
#         fields = '__all__'


class Community(models.Model):
    community_name = models.CharField(max_length=100)
    community_desc = models.CharField(max_length=200)
    create_date = models.DateTimeField('date published')
    owner = models.ForeignKey(MyUser, default="", on_delete=models.CASCADE)
    join_allowed = models.BooleanField(default=False)  # allow joining to community
    newdt_allowed = models.BooleanField(default=False)  # allow creating data types
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.community_name

    def was_published_recently(self):
        return self.create_date >= timezone.now() - datetime.timedelta(days=1)

class CommunityFollower(models.Model):
    community = models.ForeignKey(Community, default="", on_delete=models.CASCADE)
    follower = models.ForeignKey(MyUser, default="", on_delete=models.CASCADE)
    approved = models.BooleanField(default=True)
    # If a user wants to join a community, if Community.join_allowed equals to false
    # firstly owner of the community should approve this join request.


class CommunityTag(models.Model):
    tag_desc = models.CharField(max_length=100)
    community = models.ForeignKey(Community, default="", on_delete=models.CASCADE)
    tag_info = JSONField(default="")


class FormField(models.Model):
    # Constants for generic string types
    IMAGE = 'IM'
    VIDEO = 'VI'
    AUDIO = 'AU'
    TEXT = 'TE'
    TEXT_AREA = 'TA'
    URI = 'UR'
    LOCATION = 'LO'
    DATE = 'DA'
    DECIMAL = 'DE'
    INT = 'IM'
    Generic_Field_Types = (
        (IMAGE, 'Image'),
        (VIDEO, 'Video'),
        (AUDIO, 'Audio'),
        (TEXT, 'Text field'),
        (TEXT_AREA, 'Text area'),
        (URI, 'URI'),
        (LOCATION, 'Location'),
        (DATE, 'Date'),
        (DECIMAL, 'Decimal'),
        (INT, 'Integer')
    )
    community = models.ForeignKey(Community, default="", on_delete=models.CASCADE)
    field_type = models.CharField(max_length=2, choices=Generic_Field_Types, default=TEXT)
    field_label = models.CharField(max_length=50)
    is_required = models.BooleanField(default=False)

    def __str__(self):
        return self.field_label


class DataType(models.Model):
    data_type_name = models.CharField(max_length=100)
    data_type_desc = models.TextField(default="")
    community = models.ForeignKey(Community, default="", on_delete=models.CASCADE)
    owner = models.ForeignKey(MyUser, default="", on_delete=models.CASCADE)
    fields = models.ManyToManyField(FormField)
    # todo filter form fields based on data type's community.
    formfields = JSONField(default="")

    def __str__(self):
        return self.data_type_name

class Post(models.Model):
    community = models.ForeignKey(Community, default="", on_delete=models.CASCADE)
    data_type = models.ForeignKey(DataType, default="", on_delete=models.CASCADE)
    post_name = models.CharField(max_length=100)
    post_desc = models.TextField(default="")
    owner     = models.ForeignKey(MyUser, default="", on_delete=models.CASCADE)
    create_date = models.DateTimeField('date published')
    post_data   = JSONField(default="")

class UserBuilderRequest(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    # If a user want to be a community builder,
    # admin approval is needed.


