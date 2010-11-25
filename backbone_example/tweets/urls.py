from django.conf.urls.defaults import *
from tweets.api import TweetResource

tweet_resource = TweetResource()

urlpatterns = patterns('',
    (r'^api/', include(tweet_resource.urls)),
)


