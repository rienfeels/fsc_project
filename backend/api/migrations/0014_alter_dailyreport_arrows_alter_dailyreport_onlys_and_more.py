# Generated by Django 5.0.3 on 2024-04-08 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_dailyreport_dot_employee_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailyreport',
            name='arrows',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dailyreport',
            name='onlys',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dailyreport',
            name='railroad_crossing',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dailyreport',
            name='rpm',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dailyreport',
            name='stop_bars',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
    ]
