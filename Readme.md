import requests
from forcediphttpsadapter.adapters import ForcedIPHTTPSAdapter
session = requests.Session()
session.mount("https://207.154.246.125:8080", ForcedIPHTTPSAdapter(dest_ip='207.154.246.125'))
response = session.get(
    '/some/path', headers={'Host': '207.154.246.125'}, verify=False)