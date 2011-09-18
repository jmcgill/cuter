from google.appengine.api import memcache
from google.appengine.ext import webapp
from webob import Request, Response

class CacheMiddleware(object):
  def __init__(self, app):
    self.app = app

  def __call__(self, environ, start_response):
    req = Request(environ)

    data = memcache.get(req.url)
    if data is not None:
      resp = Response()
      resp.body = data
    else:
      resp = req.get_response(self.app)
      memcache.add(req.url, resp.body)

    resp.headers["Cache-Control"] ="public; max-age: 86400"
    return resp(environ, start_response)

    
