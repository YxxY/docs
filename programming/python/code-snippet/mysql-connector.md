mysql client

```python
#!/usr/bin/env python2
# coding=utf8

import os
import mysql.connector
from mysql.connector import errorcode
import ConfigParser

class Mysql_Connector(object):

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
            config['user'] = conf.get("mysql", "user")
            config['password'] = conf.get("mysql", "password")
            config['host'] = conf.get("mysql", "host")
            config['port'] = conf.get("mysql", "port")
            config['database'] = conf.get("mysql", "database")
        except Exception as e:
            raise Exception(e.message)
        return config

    def connect(self):
        try:
            cnx = mysql.connector.connect(**self.config)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            self.client = cnx

    def query(self, sql, *args):
        
        cursor = self.client.cursor()
        cursor.execute(sql, args)
        self.cursor = cursor
        return cursor

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.client:
            self.client.close()

def main():
    mysql = Mysql_Connector()   
    sql = "select id, uuid from job where create_date >= '%s 0:0:0' and \
            create_date <= '%s 23:59:59')"% ('2018-09-10', '2018-09-10')
    cursor = mysql.query(sql)
    for (id, uuid) in cursor:
        print "get {}, {}".format(id, uuid)
    mysql.close()

if __name__ == '__main__':
    main()
```