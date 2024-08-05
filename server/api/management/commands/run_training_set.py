from openai import OpenAI
import sys
import os
import json
import django
from django.core.management.base import BaseCommand
from api.models import GPTTraining

class Command(BaseCommand):
    help = 'Description of your command'

    def add_arguments(self, parser):
        # Adding a positional argument
        parser.add_argument('arg1', type=str, help='Argument 1 description')
        
        # Adding an optional argument
        parser.add_argument('--option', type=str, help='Optional argument description')


    def handle(self, *args, **kwargs):
        """Handles the submission of a fine-tuning job to the GPT servers using the Django admin command
        """
        pairings = GPTTraining.objects.all()

        # Get the pairings as a list of dictionaries
        pairing_fields = pairings.values('prompt', 'response')

        # Write each pairing as a JSON object in a new line
        with open('gpt_exports.jsonl', 'w', encoding='utf-8') as f:
            for pairing in pairing_fields:
                formatted_pairing = {
                'prompt': pairing['prompt'],
                'completion': pairing['response']  # Change 'response' to 'completion'
            }
                #write to jsonl file
                f.write(json.dumps(formatted_pairing) + '\n')

        #open up client for fine-tuning job, export file to fine-tune
        client = OpenAI(api_key="sk-proj-61toAytXsa7MXjQRwzS6T3BlbkFJgmmLXYAic3VQyVN1oEMH")
        file = client.files.create(
        file=open("gpt_exports.jsonl", "rb"),
        purpose="fine-tune"
        )
        return client.fine_tuning.jobs.create(
    training_file=file, 
    model="gpt-3.5-turbo"
        )