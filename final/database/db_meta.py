# -*- coding: utf-8 -
from pymongo import MongoClient
import config
import crawler3
INDEX = 'https://www.moviemovie.com.tw/movie/year-'
if __name__ == "__main__":
	client = MongoClient('mongodb://' + config.username + ':' + config.password + '@' + config.ip + '/tracking?authSource=admin')
	#client = MongoClient(hostname=['localhost@27017']
	#client = MongoClient('mongodb://localhost:27017/')
	db = client.mydb
	movie_collection = db.movietitle

	mycrawler = crawler3.moviecrawler(40,2016,INDEX)
	#start = time.time()
	data=mycrawler.run()
	#print('花費: %f 秒'%(time.time() - start))
	#print('共%d項結果：'%len(mycrawler.posts))
	movie_collection.insert_many(data)
	for post in movie_collection.find():
		print(post)
