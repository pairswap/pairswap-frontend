#!/bin/sh

docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker pull froggy000/ko-exchange
docker run -p 3000:3000 froggy000/ko-exchange
