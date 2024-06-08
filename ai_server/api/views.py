from django.shortcuts import render
from django.http import HttpResponse
from openai import OpenAI


# Create your views here.

def main(request,prompt):
    
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