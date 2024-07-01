from django.shortcuts import render
from django.http import HttpResponse
from openai import OpenAI
from rest_framework.response import Response
from rest_framework import status
from .serializers import GPTTrainingSerializer, HeavyTrainingSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

def main(request,topic, difficulty, questionType):
   

    prompt = f'give me one question with the answer, {questionType}, on the topic of {topic}, at difficulty level {difficulty}. Label the question, the options and the answer'

    


    
    client = OpenAI(
        api_key="sk-proj-61toAytXsa7MXjQRwzS6T3BlbkFJgmmLXYAic3VQyVN1oEMH",
    )
    def chat_with_gpt(prompt):
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

    return HttpResponse(chat_with_gpt(prompt))

@api_view(['POST'])
def send_data(request):
    if request.method == 'POST':
        GPTserializer = GPTTrainingSerializer(data=request.data)
        Heavyserializer = HeavyTrainingSerializer(data=request.data)
        if GPTserializer.is_valid() and Heavyserializer.is_valid():
            GPTserializer.save()
            Heavyserializer.save()


            return Response(GPTserializer.data, status=status.HTTP_201_CREATED)
        return Response(GPTserializer.errors, status=status.HTTP_400_BAD_REQUEST)
