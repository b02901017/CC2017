FROM node:latest
# replace this with your application's default port
ADD . /code
WORKDIR /code
RUN npm install
EXPOSE 3000
CMD npm run startWatch
