from .views import main
from .views import send_data
from django.urls import path

urlpatterns = [
    path("<str:prompt>/", main),
    path('api/save/', send_data, name='save-response'),


]
