from django.contrib.auth.models import User
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from tweets.models import Tweet
from tweets.utils import gravatar

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ('username', 'first_name', 'last_name')

    def dehydrate(self, bundle):
        if bundle.obj and bundle.obj.email:
            bundle.data['gravatar'] = gravatar(bundle.obj.email)
        return bundle

class TweetResource(ModelResource):
    class Meta:
        queryset = Tweet.objects.all()
        authorization = Authorization()
