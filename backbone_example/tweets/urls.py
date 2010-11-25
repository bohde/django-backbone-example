from django.conf.urls.defaults import *
from tweets.api import TweetResource

tweet_resource = TweetResource()

urlpatterns = patterns('',
    (r'^$',
     'django.views.generic.simple.direct_to_template',
     {'template':'index.html'}),
    (r'^api/', include(tweet_resource.urls)),
)


