from tastypie.resources import ModelResource
from tweets.models import Tweet

class TweetResource(ModelResource):
    class Meta:
        queryset = Tweet.objects.all()
