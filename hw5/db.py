# -*- coding: utf-8 -
from pymongo import MongoClient
import crawler
import time 
INDEX = 'https://www.ptt.cc/bbs/movie/index.html'
if __name__ == "__main__":
    client = MongoClient('mongodb://chentp6vu3jp6:' + "tp6vu3jp6" + '@127.0.0.1/tracking?authSource=admin')
    db = client.mydb
    movie_collection = db.movie

    mycrawler = crawler.pttcrawler(20,INDEX)
    start = time.time()
    mycrawler.run()
    print('花費: %f 秒' % (time.time() - start))
    print('共%d項結果：' % len(mycrawler.posts))
    movie_collection.insert_many(mycrawler.posts)
    for post in movie_collection.find():
        print(post)
