from tastypie.api import Api
from resources import *

v1 = Api("v1")
v1.register(UserResource())
v1.register(TweetResource())
