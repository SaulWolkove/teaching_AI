# Generated by Django 5.0.6 on 2024-06-19 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_addresponse_gpttraining'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeavyTraining',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prompt', models.TextField()),
                ('response', models.TextField()),
                ('difficulty', models.TextField()),
                ('topic', models.TextField()),
            ],
        ),
    ]
