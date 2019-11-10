# Generated by Django 2.2.7 on 2019-11-09 12:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('community_id', models.CharField(max_length=10)),
                ('community_name', models.CharField(max_length=100)),
                ('community_desc', models.CharField(max_length=200)),
                ('create_date', models.DateTimeField(verbose_name='date published')),
                ('owner_id', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Data_Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_type_id', models.CharField(max_length=10)),
                ('data_type_name', models.CharField(max_length=100)),
                ('community_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Community')),
            ],
        ),
        migrations.CreateModel(
            name='Community_Tags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_id', models.CharField(max_length=10)),
                ('tag_desc', models.CharField(max_length=100)),
                ('community_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Community')),
            ],
        ),
    ]
