from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class DailyReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(auto_now_add=True)
    road_name = models.CharField(max_length=255, default='')
    contractor = models.CharField(max_length=255, default='')
    workers = models.CharField()
    job_time_arrived = models.TimeField()
    job_time_finished = models.TimeField()
    color = models.CharField(max_length=20)  # "white" or "yellow"
    material = models.CharField(max_length=10)  # "paint" or "thermo"
    line_type = models.CharField(max_length=10)  # "solid" or "skip"
    white_footage = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    white_size = models.CharField(max_length=50, default='')
    yellow_footage = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    yellow_size = models.CharField(max_length=50, default='')
    dot_employee = models.BooleanField(default=False)

