from .views import question_query, send_data, teach
from django.urls import path

urlpatterns = [
    #path for querying openai api functionality
    path("api/response/<str:topic>/<str:difficulty>/<str:questionType>", question_query, name='main-view'),

    #path for saving training data to db
    path('api/save/', send_data, name='save-response'),

    #path for pulling teaching data from openai api 
    path('api/response/teach/<str:topic>', teach, name='save-response'),
]
