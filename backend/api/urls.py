from django.urls import path
from .views import generate_pdf
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('daily-reports/', views.DailyReportListCreate.as_view(), name='daily-report-list-create'),
    path('generate-pdf/', views.generate_pdf, name='generate-pdf'),
    path('test/', views.testEndPoint, name='test-endpoint'),
    path('', views.getRoutes)
]
