import tornado.httpserver
import tornado.ioloop
import tornado.web
# import tornado.web.RequestHandler
import logging
import os
import sys

_startroute = 'static/index.html'
_debug = True
_port = 8080

#----------------------------------------------#
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(_startroute)
#----------------------------------------------#
def make_app():
    settings = {
        "debug": _debug
    }
    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/(.*)", tornado.web.StaticFileHandler,{"path": os.path.join(os.path.dirname(__file__),"static")})
    ], **settings)
    return application
#----------------------------------------------#
if __name__ == "__main__":
    app = make_app()
    app.listen(_port)
    tornado.ioloop.IOLoop.current().start()
#----------------------------------------------#
