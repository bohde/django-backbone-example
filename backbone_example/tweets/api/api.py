from tastypie.api import Api
from resources import TweetResource

v1 = Api("v1")
v1.register(TweetResource())
