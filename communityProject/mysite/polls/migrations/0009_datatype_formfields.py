# Generated by Django 2.2.7 on 2019-11-17 13:10

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0008_auto_20191110_1833'),
    ]

    operations = [
        migrations.AddField(
            model_name='datatype',
            name='formfields',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=''),
        ),
    ]