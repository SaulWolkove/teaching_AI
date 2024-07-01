from .views import main
from .views import send_data
from django.urls import path

urlpatterns = [
    path("api/response/<str:topic>/<str:difficulty>/<str:questionType>", main, name='main-view'),
    path('api/save/', send_data, name='save-response'),
]
