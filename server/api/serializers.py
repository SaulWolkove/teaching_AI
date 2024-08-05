# serializers.py
from rest_framework import serializers
from .models import GPTTraining, HeavyTraining

class GPTTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPTTraining
        fields = '__all__'


class HeavyTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeavyTraining
        fields = '__all__'