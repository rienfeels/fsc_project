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


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class DailyReportListCreate(generics.ListCreateAPIView):
    queryset = DailyReport.objects.all()
    permission_classes = (AllowAny)
    serializer_class = DailyReportSerializer

   




@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/test/',
        '/api/daily-reports/',
        '/api/generate-pdf/',
        '/api/daily-reports/<int:report_id>/',
        '/api/daily-reports/<int:report_id>/delete/',
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




def generate_pdf(request, report_id):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="daily_report.pdf"'

    report = DailyReport.objects.get(id=report_id)

    pdf = canvas.Canvas(response)
    y_coordinate = 800
    pdf.drawString(100, y_coordinate, f"Road Name: {report.road_name}")
    pdf.drawString(100, y_coordinate - 20, f"Contractor: {report.contractor}")
    pdf.drawString(100, y_coordinate - 40, f"Workers: {report.workers}")
    pdf.drawString(100, y_coordinate - 60, f"Job Time Arrived: {report.job_time_arrived.strftime('%H:%M')}")
    pdf.drawString(100, y_coordinate - 80, f"Job Time Finished: {report.job_time_finished.strftime('%H:%M')}")
    pdf.drawString(100, y_coordinate - 100, f"Color: {report.color}")
    pdf.drawString(100, y_coordinate - 120, f"Material: {report.material}")

    if report.color == 'white':
        pdf.drawString(100, y_coordinate - 140, f"White Line Type: {report.white_line_type}")
        if report.white_line_type == 'solid':
            pdf.drawString(100, y_coordinate - 160, f"White Solid Footage: {report.white_solid_footage}")
            pdf.drawString(100, y_coordinate - 180, f"White Solid Size: {report.white_solid_size}")
        elif report.white_line_type == 'skip':
            pdf.drawString(100, y_coordinate - 160, f"White Skip Footage: {report.white_skip_footage}")
            pdf.drawString(100, y_coordinate - 180, f"White Skip Size: {report.white_skip_size}")
        elif report.white_line_type == 'both':
            pdf.drawString(100, y_coordinate - 160, f"White Solid Footage: {report.white_solid_footage}")
            pdf.drawString(100, y_coordinate - 180, f"White Solid Size: {report.white_solid_size}")
            pdf.drawString(100, y_coordinate - 200, f"White Skip Footage: {report.white_skip_footage}")
            pdf.drawString(100, y_coordinate - 220, f"White Skip Size: {report.white_skip_size}")
    elif report.color == 'yellow':
        pdf.drawString(100, y_coordinate - 140, f"Yellow Line Type: {report.yellow_line_type}")
        if report.yellow_line_type == 'solid':
            pdf.drawString(100, y_coordinate - 160, f"Yellow Solid Footage: {report.yellow_solid_footage}")
            pdf.drawString(100, y_coordinate - 180, f"Yellow Solid Size: {report.yellow_solid_size}")
        elif report.yellow_line_type == 'skip':
            pdf.drawString(100, y_coordinate - 160, f"Yellow Skip Footage: {report.yellow_skip_footage}")
            pdf.drawString(100, y_coordinate - 180, f"Yellow Skip Size: {report.yellow_skip_size}")
        elif report.yellow_line_type == 'both':
            pdf.drawString(100, y_coordinate - 160, f"Yellow Solid Footage: {report.yellow_solid_footage}")
            pdf.drawString(100, y_coordinate - 180, f"Yellow Solid Size: {report.yellow_solid_size}")
            pdf.drawString(100, y_coordinate - 200, f"Yellow Skip Footage: {report.yellow_skip_footage}")
            pdf.drawString(100, y_coordinate - 220, f"Yellow Skip Size: {report.yellow_skip_size}")
    elif report.color == 'both':
        pdf.drawString(100, y_coordinate - 140, f"White Line Type: {report.white_line_type}")
        if report.white_line_type == 'solid':
            pdf.drawString(100, y_coordinate - 160, f"White Solid Footage: {report.white_solid_footage}")
            pdf.drawString(100, y_coordinate - 180, f"White Solid Size: {report.white_solid_size}")
        elif report.white_line_type == 'skip':
            pdf.drawString(100, y_coordinate - 160, f"White Skip Footage: {report.white_skip_footage}")
            pdf.drawString(100, y_coordinate - 180, f"White Skip Size: {report.white_skip_size}")
        elif report.white_line_type == 'both':
            pdf.drawString(100, y_coordinate - 160, f"White Solid Footage: {report.white_solid_footage}")
            pdf.drawString(100, y_coordinate - 180, f"White Solid Size: {report.white_solid_size}")
            pdf.drawString(100, y_coordinate - 200, f"White Skip Footage: {report.white_skip_footage}")
            pdf.drawString(100, y_coordinate - 220, f"White Skip Size: {report.white_skip_size}")

        pdf.drawString(100, y_coordinate - 240, f"Yellow Line Type: {report.yellow_line_type}")
        if report.yellow_line_type == 'solid':
            pdf.drawString(100, y_coordinate - 260, f"Yellow Solid Footage: {report.yellow_solid_footage}")
            pdf.drawString(100, y_coordinate - 280, f"Yellow Solid Size: {report.yellow_solid_size}")
        elif report.yellow_line_type == 'skip':
            pdf.drawString(100, y_coordinate - 260, f"Yellow Skip Footage: {report.yellow_skip_footage}")
            pdf.drawString(100, y_coordinate - 280, f"Yellow Skip Size: {report.yellow_skip_size}")
        elif report.yellow_line_type == 'both':
            pdf.drawString(100, y_coordinate - 260, f"Yellow Solid Footage: {report.yellow_solid_footage}")
            pdf.drawString(100, y_coordinate - 280, f"Yellow Solid Size: {report.yellow_solid_size}")
            pdf.drawString(100, y_coordinate - 300, f"Yellow Skip Footage: {report.yellow_skip_footage}")
            pdf.drawString(100, y_coordinate - 320, f"Yellow Skip Size: {report.yellow_skip_size}")

    pdf.drawString(100, y_coordinate - 340, f"DOT Employee: {'Yes' if report.dot_employee else 'No'}")

    y_coordinate -= 380

    pdf.save()
    return response

@api_view(['PUT'])
def update_daily_reports(request, report_id):
    try:
        report = DailyReport.objects.get(id=report_id)
        serializer = DailyReportSerializer(report, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    except DailyReport.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)
    
@api_view(['GET'])
def get_daily_report(request, report_id):
    try:
        report = DailyReport.objects.get(id=report_id)
        serializer = DailyReportSerializer(report)
        return Response(serializer.data)
    except DailyReport.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)
    
@api_view(['GET'])
def delete_daily_report(request, report_id):
    try:
        report = DailyReport.objects.get(id=report_id)
        report.delete()
        return Response({"message": "Report deleted successfully"})
    except DailyReport.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)
