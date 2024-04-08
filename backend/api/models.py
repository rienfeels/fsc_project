from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class DailyReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(auto_now_add=True)
    road_name = models.CharField(max_length=255, default='')
    contract_number = models.CharField(max_length=255, default='', blank=True)
    contractor = models.CharField(max_length=255, default='')
    workers = models.CharField(max_length=255, default='')
    job_time_arrived = models.TimeField()
    job_time_finished = models.TimeField()
    color = models.CharField(max_length=20) 
    material = models.CharField(max_length=10)  
    line_type = models.CharField(max_length=10,default='', blank=True)  
    white_line_type = models.CharField(max_length=10, default='', blank=True)
    yellow_line_type = models.CharField(max_length=10, default='', blank=True)
    white_solid_footage = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    white_skip_footage = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    yellow_solid_footage = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    yellow_skip_footage = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    white_solid_size = models.CharField(max_length=50, default='', blank=True, null=True)
    white_skip_size = models.CharField(max_length=50, default='', blank=True, null=True)
    yellow_solid_size = models.CharField(max_length=50, default='', blank=True, null=True)
    yellow_skip_size = models.CharField(max_length=50, default='', blank=True, null=True)
    dot_employee = models.BooleanField(default=False)
    dot_employee_name = models.CharField(max_length=255, default='', blank=True)
    stop_bars = models.CharField(max_length=255, default='', blank=True)
    arrows = models.CharField(max_length=255, default='', blank=True)
    onlys = models.CharField(max_length=255, default='', blank=True)
    railroad_crossing = models.CharField(max_length=255, default='', blank=True)
    rpm = models.CharField(max_length=255, default='', blank=True)
    

