mongodb client

```python
#!/usr/bin/env python2
# coidng=utf-8

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import ConfigParser, os

class Mongodb_Connector(object):

    def __init__(self):
        self.config = self.getConfig()
        self.client = ''
        self.connect()

    @staticmethod
    def getConfig(filename='config.ini'):
        conf = ConfigParser.ConfigParser()
        config_dir = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(config_dir, filename)
        conf.read(config_path)

        config = {}
        try:
            config['username'] = conf.get("mongodb", "user")
            config['password'] = conf.get("mongodb", "password")
            config['host'] = conf.get("mongodb", "host")
            config['port'] = int(conf.get("mongodb", "port"))
        except Exception as e:
            raise Exception(e.message)

        return config

    def connect(self):
        client = MongoClient(**self.config)
        try:
            # The ismaster command is cheap and does not require auth.
            client.admin.command('ismaster')
        except ConnectionFailure:
            raise Exception("Server not available")
        else:
            self.client = client

    def close(self):
        self.client.close()


def main():
    client = Mongodb_Connector()
    client.close()

if __name__ == '__main__':
    main()

```