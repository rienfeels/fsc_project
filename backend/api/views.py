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
from .tts_service import generate_speech




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

# def tts_endpoint(request):
#     if request.method == "POST":
#         data = request.POST.get("text")
#         if data:
#             speech = generate_speech(data)
#             return JsonResponse({"speech": speech})
#         else:
#             return JsonResponse({"error": "Text data not provided"}, status=400)
#     else:
#         return JsonResponse({"error": "Method not allowed"}, status=405)
    
def stt_endpoint(request):
    if request.method == "POST":
        audio_data = request.FILES.get("audio")
        if audio_data:
            client = speech.SpeechClient()
            audio = speech.RecognitionAudio(content=audio_data.read())
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
                sample_rate_hertz=16000,
                language_code="en-US",
            )
            response = client.recognize(config=config, audio=audio)
            transcript = ""
            for result in response.results:
                transcript += result.alternatives[0].transcript
            return JsonResponse({"transcript": transcript})
        else:
            return JsonResponse({"error": "Audio data not provided"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


def generate_pdf(request, report_id):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="daily_reports.pdf"'

    report = DailyReport.objects.get(id=report_id)

    pdf = canvas.Canvas(response)
    y_coordinate = 800
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