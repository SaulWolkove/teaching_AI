from django.shortcuts import render
from django.http import HttpResponse
from openai import OpenAI
from rest_framework.response import Response
from rest_framework import status
from .serializers import GPTTrainingSerializer, HeavyTrainingSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GPTTraining
import os
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv('API_KEY')
# Create your views here.

def chat_with_gpt(prompt):
    #defines function to query gpt based on prompt
        client = OpenAI(
        api_key= API_KEY,
    )
        chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-3.5-turbo",
    )
        return chat_completion.choices[0].message.content.strip()

def question_query(request,topic, difficulty, questionType):
    """submits prompt to GPT api regarding question/answer combo
    """
   
   #prepares prompt query based on question type
    extra = "Label the question, the options and the answer"
    if questionType == "MC":
        extra = extra + " and give 4 multiple choice options"
    if questionType == "TF":
        extra = ""
        questionType = "true or false"
    
    #engineers prompt
    prompt = f'give me one question with the answer, {questionType}, on the topic of {topic}, at difficulty level {difficulty}. {extra}'

    #returns cleaned version of response in HTTP response format
    return HttpResponse(chat_with_gpt(prompt))

def teach(request,topic):
    """returns the response to a question-triggered response
    """
    chat_completion = chat_with_gpt(topic)
    return HttpResponse(chat_completion)


@api_view(['POST'])
def send_data(request):
    """if the content is posted, serialize the data in the Django models created and save them to the db
    """
    if request.method == 'POST':
        GPTserializer = GPTTrainingSerializer(data=request.data)
        Heavyserializer = HeavyTrainingSerializer(data=request.data)
        if GPTserializer.is_valid() and Heavyserializer.is_valid():
            GPTserializer.save()
            Heavyserializer.save()
            return Response(GPTserializer.data, status=status.HTTP_201_CREATED)
        return Response(GPTserializer.errors, status=status.HTTP_400_BAD_REQUEST)
