# Generated by Django 5.0.3 on 2024-04-10 21:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_rename_user_dailyreport_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dailyreport',
            old_name='user_id',
            new_name='user',
        ),
    ]
