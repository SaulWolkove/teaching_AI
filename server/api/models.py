from django.db import models

# Create your models here.

#model for GPT-focused training data
class GPTTraining(models.Model):
    prompt = models.TextField()
    response = models.TextField()

#model for general training usage, to be optimised as seen fit
class HeavyTraining(models.Model):
    prompt = models.TextField()
    response = models.TextField()
    difficulty = models.TextField()
    topic = models.TextField()