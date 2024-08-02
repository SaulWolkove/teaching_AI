from .views import main, send_data, teach, export_to_jsonl
from django.urls import path

urlpatterns = [
    path("api/response/<str:topic>/<str:difficulty>/<str:questionType>", main, name='main-view'),
    path('api/save/', send_data, name='save-response'),
    path('api/response/teach/<str:topic>', teach, name='save-response'),
    path('export-to-jsonl/',  export_to_jsonl, name='export_to_jsonl')
]
