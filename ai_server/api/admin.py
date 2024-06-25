from django.contrib import admin
from .models import GPTTraining, HeavyTraining

# Register your model here
admin.site.register(GPTTraining)
admin.site.register(HeavyTraining)
