import storm
import time
import datetime
class SplitBolt(storm.BasicBolt):
    # There's nothing to initialize here,
    # since this is just a split and emit
    # Initialize this instance
    def initialize(self, conf, context):
        self._conf = conf
        self._context = context
        storm.logInfo("Split bolt instance starting...")

    def process(self, tup):
        # change the form of our log 
        word = tup.values[0].split('[')
        word = word[1].split(' -0800')
        word = datetime.datetime.strptime(word[0], "%d/%b/%Y:%H:%M:%S")
        word =  time.strftime('%Y-%m-%d T %H:00:00.000')+"\t1"
        storm.logInfo("received %s" % word)
        # Loop over words and emit
        storm.logInfo("Emitting %s" % word)
        storm.emit(word)

# Start the bolt when it's invoked
SplitBolt().run()
