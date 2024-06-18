# serializers.py

from rest_framework import serializers
from .models import AddResponse

class AddResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddResponse
        fields = '__all__'