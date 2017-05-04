#!/bin/bash
# Hadoop stream jar
STREAMJAR=/usr/lib/hadoop-mapreduce/hadoop-streaming-2.7.3.jar
# input file
INPUT=access_log
# input directory
INPUT_DIR=/input
# output file
OUTPUT=output_haddop.dat
# output directory
OUTPUT_DIR=/output
# mapper file
MAPPER=./mapper.py
# reducer file
REDUCER=./reducer.py
# create input directory on hdfs
hdfs dfs -mkdir /input
# upload input file to input directory
hdfs dfs -put $INPUT $INPUT_DIR
# remove old output directory
hdfs dfs -rm -r -f $OUTPUT_DIR
# execute map-reduce with Hadoop stream jar
hadoop jar $STREAMJAR  \
        -D stream.num.map.output.key.fields=4 \
        -D map.output.key.field.seperator=, \
        -D mapres.text.key.partitioner.options=k3,4 \
        -D mapred.reduce.task=8 \
        -files $MAPPER,$REDUCER \
        -mapper $MAPPER \
        -reducer $REDUCER \
        -partitioner org.apache.hadoop.mapred.lib.KeyFieldBasedPartitioner \
        -input $INPUT_DIR \
        -output $OUTPUT_DIR
# download the output file from hdfs
hdfs dfs -copyToLocal $OUTPUTDIR  $(PWD)/output
cat ./output/* | sort > result.dat