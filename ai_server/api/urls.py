from .views import main, explain, send_data
from django.urls import path

urlpatterns = [
    path("api/response/<str:topic>/<str:difficulty>/<str:questionType>", main, name='main-view'),
    path('api/save/', send_data, name='save-response'),
    path('api/response/explain/<str:explain>/<str:answer>', explain, name='save-response'),

]
