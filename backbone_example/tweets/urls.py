from django.conf.urls.defaults import *
from tweets.api import v1

urlpatterns = patterns('',
    (r'^$',
     'django.views.generic.simple.direct_to_template',
     {'template':'index.html'}),
    (r'^api/', include(v1.urls)),
)


