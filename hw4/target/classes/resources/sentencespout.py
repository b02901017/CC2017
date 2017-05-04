import storm
import random
import sys
import time
import datetime
import pydoop.hdfs as hdfs
# Define some sentences

class SentenceSpout(storm.Spout):
    # Not much to do here for such a basic spout
    def initialize(self, conf, context):
        self._conf = conf
        self.i = 0
        self._context = context
        self.datas = hdfs.open('./access_log')
        storm.logInfo("Spout instance starting...")

    # Process the next tuple
    def nextTuple(self):
        for data in self.datas :
            storm.logInfo("Emiting %s" % data)
            storm.emit([data])

# Start the spout when it's invoked
SentenceSpout().run()
