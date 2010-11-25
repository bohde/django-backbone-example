from django.db import models

class Tweet(models.Model):
    username = models.CharField(max_length=25)
    message = models.CharField(max_length=140)
    timestamp = models.DateTimeField(auto_now_add=True)
