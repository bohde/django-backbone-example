from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from tweets.models import Tweet

class TweetResource(ModelResource):
    class Meta:
        queryset = Tweet.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']
