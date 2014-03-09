#!/usr/bin/env python
import cgi
import cgitb; cgitb.enable()  # for troubleshooting
import os
from hashlib import sha256
import hmac
from collections import defaultdict

SHARED_SECRET_KEY = 'BESURETODRINKYOUROVALTINE'
def authenticate_with_codepuppy(user_token, forward_url, verify_url):
  sunetid = os.environ['REMOTE_USER']
  h = hmac.new(SHARED_SECRET_KEY, "{0},{1}".format(user_token, sunetid), sha256)
  url = "{0}?user_token={1}&user_system_id={2}&hmac={3}&foward_url={4}"
  url = url.format(verify_url, user_token, sunetid, h.hexdigest(), forward_url)
  print("Content-Type: text/plain")
  print("")
  print("Location:{0}".format(url))

def main():
  form = cgi.FieldStorage()
  user_token = form.getvalue("user_token")
  forward_url = form.getvalue("forward_url")
  verify_url = form.getvalue("verify_url")
  if user_token == None:
    print("Content-Type: text/plain")
    print("")
    print("unauthorized user plz go")
    return
  authenticate_with_codepuppy(user_token, forward_url, verify_url)

if __name__ == '__main__':
  main()
