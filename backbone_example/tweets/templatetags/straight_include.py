"""
Straight Include template tag by @HenrikJoreteg

Django templates don't give us any way to escape template tags.

So if you ever need to include client side templates for ICanHaz.js (or anything else that
may confuse django's templating engine) You can is this little snippet.

Just use it as you would a normal {% include %} tag. It just won't process the included text.

It assumes your included templates are in you django templates directory.

Usage:

{% load straight_include %}

{% straight_include "my_icanhaz_templates.html" %}

"""

from django import template
from django.conf import settings


register = template.Library()


class StraightIncludeNode(template.Node):
    def __init__(self, template_path):
        self.filepath = '%s/%s' % (settings.TEMPLATE_DIRS[0], template_path)

    def render(self, context):
        fp = open(self.filepath, 'r')
        output = fp.read()
        fp.close()
        return output


def do_straight_include(parser, token):
    """
    Loads a template and includes it without processing it
    
    Example::
    
    {% straight_include "foo/some_include" %}
    
    """
    bits = token.split_contents()
    if len(bits) != 2:
        raise template.TemplateSyntaxError("%r tag takes one argument: the location of the file within the template folder" % bits[0])
    path = bits[1][1:-1]
    
    return StraightIncludeNode(path)


register.tag("straight_include", do_straight_include)