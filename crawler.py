# -*- coding: utf-8 -
import requests
import urllib.parse
import time 
from bs4 import BeautifulSoup
from multiprocessing import Pool
import json

INDEX = 'https://www.moviemovie.com.tw/movie/year-'


class moviecrawler:
    def __init__(self ,pages = 0, year = 2017, INDEX = ""):
        self.INDEX = INDEX
        self.pages = pages
        self.year = year
        self.posts = []
    def get_posts_list(self, url):
        response = requests.get(url)

        
        soup = BeautifulSoup(response.text, 'lxml')

        data = list()
        for movie in soup.find_all('div', 'mmMdbModelOut'):
            title = movie.find('div', 'mdbTitle').find('h2').getText().replace(' ','')
            temp = movie.find('div', 'mainBread')
            tags = movie.find('div', 'mainBread').find_all('a')
            img = movie.find('div', 'mainIntrol').find('img')['src']
            
            try :
                rate = movie.find('div', 'introRate').find('span').getText().replace('\t','').replace('\n','').replace('\r','')
            except:
                rate = 'NAN'
            tag = 'NAN'
            time = 'NAN'
            grade = 'NAN'
            for t in tags :
                # print(t)
                t = t.getText().replace('\t','').replace('\n','').replace('\r','')
                if t.endswith('分') :
                    time = t

                if t.find('級') != -1 :

                    grade = t

                    # break
            data.append({
                'Title':title,
                'Img': img,
                "Grade" : grade,
                'Time': time,
                'Rate': rate
            })


        return data

    def get_data(self, year, page):
        
        all_posts = list()
        for i in range(1, page+1):
            url = self.INDEX + str(year) + '?page='+str(i)
            posts = self.get_posts_list(url)
            all_posts += posts

        return all_posts


    def run(self) :
       
        data = self.get_data(self.year,self.pages)
        return data


if __name__ == '__main__':
    
    mycrawler = moviecrawler(5, 2017,INDEX)
    # start = time.time()
    data = mycrawler.run()
    for d in data:
        
        print(d)
