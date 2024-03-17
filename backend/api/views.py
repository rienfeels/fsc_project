from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import DailyReport
from .serializer import DailyReportSerializer
import json
from reportlab.pdfgen import canvas

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class DailyReportListCreate(generics.ListCreateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer




@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/test/',
        '/api/daily-reports/',
        '/api/generate-pdf/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)
            if 'text' not in data:
                return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f'Congratulation your API just responded to POST request with text: {text}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
    return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def daily_reports_list(request):
    daily_reports = DailyReport.objects.all()
    serializer = DailyReportSerializer(daily_reports, many=True)
    return Response(serializer.data)

def generate_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="daily_reports.pdf"'

    daily_reports = DailyReport.objects.all()

    pdf = canvas.Canvas(response)
    y_coordinate = 800
    for report in daily_reports:
        pdf.drawString(100, y_coordinate, f"Road Name: {report.road_name}")
        pdf.drawString(100, y_coordinate - 20, f"Contractor: {report.contractor}")
        pdf.drawString(100, y_coordinate - 40, f"Workers: {report.workers}")
        pdf.drawString(100, y_coordinate - 60, f"Job Time Arrived: {report.job_time_arrived}")
        pdf.drawString(100, y_coordinate - 80, f"Job Time Finished: {report.job_time_finished}")
        pdf.drawString(100, y_coordinate - 100, f"Color: {report.color}")
        pdf.drawString(100, y_coordinate - 120, f"Material: {report.material}")
        pdf.drawString(100, y_coordinate - 140, f"Line Type: {report.line_type}")
        pdf.drawString(100, y_coordinate - 160, f"White Footage: {report.white_footage}")
        pdf.drawString(100, y_coordinate - 180, f"White Size: {report.white_size}")
        pdf.drawString(100, y_coordinate - 200, f"Yellow Footage: {report.yellow_footage}")
        pdf.drawString(100, y_coordinate - 220, f"Yellow Size: {report.yellow_size}")
        pdf.drawString(100, y_coordinate - 240, f"DOT Employee: {report.dot_employee}")
        y_coordinate -= 300

    pdf.save()
    return response