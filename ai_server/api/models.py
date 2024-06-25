from django.db import models

# Create your models here.


class GPTTraining(models.Model):
    prompt = models.TextField()
    response = models.TextField()


class HeavyTraining(models.Model):
    prompt = models.TextField()
    response = models.TextField()
    difficulty = models.TextField()
    topic = models.TextField()