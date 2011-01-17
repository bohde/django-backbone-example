from unittest import TestCase

from tweets.utils import gravatar

class TestGravatar(TestCase):
    def testSampleData(self):
        """Basic sanity check from http://en.gravatar.com/site/implement/hash/"""
        
        self.assertEqual(gravatar('MyEmailAddress@example.com '),
                         '0bc83cb571cd1c50ba6f3e8a78ef1346')
                       
