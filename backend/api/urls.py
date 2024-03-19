from django.urls import path
from .views import generate_pdf, update_daily_reports, delete_daily_report
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('daily-reports/', views.DailyReportListCreate.as_view(), name='daily-report-list-create'),
    path('generate-pdf/<int:report_id>/', views.generate_pdf, name='generate-pdf'),
    path('get-daily-report/<int:report_id>/', views.get_daily_report, name='get-daily-report'),
    path('daily-reports/<int:report_id>/', update_daily_reports, name='update_daily_report'),
    path('get-daily-report/delete/<int:report_id>/', delete_daily_report, name='delete-daily-report'), 
    path('test/', views.testEndPoint, name='test-endpoint'),
    path('', views.getRoutes)
]
