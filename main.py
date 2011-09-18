try:
  import json
except:
  from django.utils import simplejson as json

import cache
import markdown
import os

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

class Index(webapp.RequestHandler):
  def get(self, project):
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    values = {
      'project': project
    }

    index = template.render(path, values)
    self.response.out.write(index)

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
    path = os.path.join(os.path.dirname(__file__), 'slides', name + '.mu')

    # Split into code and an instructional slide.
    file = open(path, 'r')
    parts = file.read().split('### Code')

    output = {}

    if len(parts) > 1:
      # Split into code and html
      html = parts[1].split('### HTML')
      output['code'] = html[0].strip()

      if len(html) > 1:
        output['html'] = html[1].strip()
      else:
        output['html'] = '<div id="map_canvas" style="height: 100%;"></div>'

    output['slide'] = markdown.markdown(parts[0])
    
    # Syntax highlighting.
    output['slide'] = output['slide'].replace('<pre', '<pre class="prettyprint"')
    file.close()

    slide = json.dumps(output)
    self.response.out.write(slide)

application = webapp.WSGIApplication([
    ('/slide/(.*)', Slide),
    ('/toc/(.*)', Toc),
    ('/(.*)', Index),
], debug=True)

# Uncomment to enable aggressive caching.
# application = cache.CacheMiddleware(application)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()
