# Generated by Django 5.0.3 on 2024-03-20 14:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_dailyreport_white_skip_footage_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dailyreport',
            name='white_footage',
        ),
        migrations.RemoveField(
            model_name='dailyreport',
            name='white_size',
        ),
        migrations.RemoveField(
            model_name='dailyreport',
            name='yellow_footage',
        ),
        migrations.RemoveField(
            model_name='dailyreport',
            name='yellow_size',
        ),
    ]