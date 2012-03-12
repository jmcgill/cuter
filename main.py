try:
  import json
except:
  from django.utils import simplejson as json

import cache
import markdown
import os
import re
import time

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

### Models
class Answer(db.Model):
  project = db.StringProperty()
  name = db.StringProperty()

class Index(webapp.RequestHandler):
  def get(self, project):
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    values = {
      'project': project
    }

    index = template.render(path, values)
    self.response.out.write(index)

class Presenter(webapp.RequestHandler):
  def get(self, project):
    path = os.path.join(os.path.dirname(__file__), 'presenter.html')
    values = {
      'project': project
    }

    index = template.render(path, values)
    self.response.out.write(index)

class Answers(webapp.RequestHandler):
  def get(self, project):
    path = os.path.join(os.path.dirname(__file__), 'answers.html')
    values = {
      'project': project
    }

    index = template.render(path, values)
    self.response.out.write(index)

class OpenAnswer(webapp.RequestHandler):
  def post(self, project):
    project = self.request.get('project')
    name = self.request.get('name')
    answer = Answer(project = project, name = name)
    answer.put()
    self.response.out.write('OK')

class ClearAnswers(webapp.RequestHandler):
  def post(self, project):
    project = self.request.get('project')
    q = db.GqlQuery("SELECT * FROM  Answer where project = :1", project)
    results = q.fetch(50)
    for p in results:
      p.delete()
    self.response.out.write('OK')

class ReadAnswer(webapp.RequestHandler):
  def get(self, project):
    name = self.request.get('name')
    q = db.GqlQuery("SELECT * FROM  Answer where project = :1 AND name = :2", project, name)
    results = q.fetch(1)

    # Has an answer been opened up?
    if len(results) > 0:
      path = os.path.join(os.path.dirname(__file__), 'slides', name + '.markdown')

      # Split out answer.
      file = open(path, 'r')
      parts = file.read().split('### Answer')
     
      if len(parts) > 1:
        self.response.out.write(parts[1])
      file.close()
    
class Toc(webapp.RequestHandler):
  def get(self, project):
    path = os.path.join(os.path.dirname(__file__), 'toc.html')
    values = {
      'project': project
    }
    toc = template.render(path, values)
    self.response.out.write(toc)

class Slide(webapp.RequestHandler):
  def get(self, name):
    path = os.path.join(os.path.dirname(__file__), 'slides', name + '.markdown')

    # Split into code and an instructional slide.
    file = open(path, 'r')
    parts = file.read().split('### ')
    output = {}
  
    # The slide is always the first component.
    # Apply markdown to the slide component.
    output['slide'] = markdown.markdown('### ' + parts[1])
    
    # Syntax highlighting.
    output['slide'] = output['slide'].replace('<pre', '<pre class="prettyprint"')
 
    for part in parts:
      # First line of each part is the name.
      lines = part.split('\n')
      key = lines[0].lower()
      output[key] = '\n'.join(lines[1:]).strip()

    # Set default HTML if none is provided.
    if 'html' not in output:
      output['html'] = '<div id="map_canvas" style="height: 100%;"></div>'

    # Auto linking of the API reference.
    output['slide'] = re.sub(r'\{([A-Za-z]+)\}',
        '<code><a href="http://code.google.com/apis/maps/documentation/javascript/reference.html#\\1" target="\\1">\\1</a></code>', output['slide'])

    # Avoid exposing answers.
    if 'answer' in output:
      output['answer'] = True;

    file.close()

    slide = json.dumps(output)
    self.response.out.write(slide)

# HACK
class Plus(webapp.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'plus.html')
    values = {
      'callback': self.request.get('callback')
    }
    plus = template.render(path, values)
    self.response.out.write(plus)

application = webapp.WSGIApplication([
    ('/slide/(.*)', Slide),
    ('/toc/(.*)', Toc),
    ('/answers/edit/(.*)', Answers),
    ('/answers/open(.*)', OpenAnswer),
    ('/answers/clear(.*)', ClearAnswers),
    ('/answers/read/(.*)', ReadAnswer),
    ('/presenter/(.*)', Presenter),
    ('/plus', Plus),
    ('/(.*)', Index),
], debug=True)

# Uncomment to enable aggressive caching.
# application = cache.CacheMiddleware(application)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()
