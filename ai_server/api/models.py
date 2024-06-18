from django.db import models

# Create your models here.


class AddResponse(models.Model):
    prompt = models.TextField()
    response = models.TextField()