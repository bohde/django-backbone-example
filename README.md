Django Backbone Example
-----------------------

This is an example application using Django, with the help of [django-tastypie](https://github.com/toastdriven/django-tastypie), and [backbone.js](https://github.com/documentcloud/backbone). Because everyone needs to write a Twitter clone, it is a Twitter clone.


Running locally
---------------

Preferably in a virtualenv, run the following commands:

    git clone https://joshbohde@github.com/joshbohde/django-backbone-example.git
    cd django-backbone-example/backbone_example
    pip install -r requirements.txt
    ./manage.py syncdb --noinput
    ./manage.py runserver
