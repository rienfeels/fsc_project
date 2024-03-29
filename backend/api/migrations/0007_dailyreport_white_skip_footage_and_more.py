# Generated by Django 5.0.3 on 2024-03-19 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_dailyreport_line_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailyreport',
            name='white_skip_footage',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='white_skip_size',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='white_solid_footage',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='white_solid_size',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='yellow_skip_footage',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='yellow_skip_size',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='yellow_solid_footage',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='dailyreport',
            name='yellow_solid_size',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]
