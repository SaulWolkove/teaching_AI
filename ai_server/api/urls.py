from .views import main, send_data, teach
from django.urls import path

urlpatterns = [
    path("api/response/<str:topic>/<str:difficulty>/<str:questionType>", main, name='main-view'),
    path('api/save/', send_data, name='save-response'),
    path('api/response/teach/<str:topic>', teach, name='save-response'),
]
