<h1 align="center">WEBPACK SKELETON</h1>
<br>

DIRECTORY STRUCTURE
-------------------

      ./.docker/ Docker images for this webpack settings
          ./src/ Contains webpack context
      ./webpack/ Contains webpack configuration
         ./dist/ Outpit webpack compile files

# QUICK START

1. Install [docker](https://docs.docker.com/engine/install/ubuntu/).
2. Install [docker-compose](https://docs.docker.com/compose/install/).
3. Add **docker** in [sudo group](https://stackoverflow.com/a/48957722/11419254), perform ALL steps except the fourth.

INSTALL
----------------
```
npm install
```

COMMAND
----------------
```
npm run up       - Up Webpack Dev SErver
npm run watch    - Run webpack watcher
npm run build    - Build as prodaction enviroment
npm run dev      - Build as development enviroment
npm run analizer - Up analize webpack packeges server
npm run profile  - Create stats by webpack packeges
```

DOCKER-COMPOSE
----------------
```
version: "3.8"

services:

    node:
        build:
            context: app/docker
            dockerfile: node/Dockerfile
        container_name: webpack-node
        volumes:
            - ./app:/app
        working_dir: /app

    node-up:
        build:
            context: app/docker
            dockerfile: node/Dockerfile
        container_name: webpack-node-up
        volumes:
            - ./app:/app
        working_dir: /app
        ports:
            - 8080:8080
        command: sh -c "until [ -f .ready ] ; do sleep 1 ; done && npm run up"

    node-analizer:
        build:
            context: app/docker
            dockerfile: node/Dockerfile
        container_name: webpack-node-analizer
        volumes:
            - ./app:/app
        working_dir: /app
        ports:
            - 8081:8081
        command: sh -c "until [ -f .ready ] ; do sleep 1 ; done && npm run analizer"
```

MAKEFILE
----------------
```
init: docker-down docker-pull docker-build npm-install docker-up ready
up: docker-down docker-up
down: docker-down
restart: docker-down docker-up

.DEFAULT_GOAL := n

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

npm-install:
	docker-compose run --rm node npm install

ready:
	docker run --rm -v ${PWD}/app:/app --workdir=/app alpine touch .ready

n:
	docker-compose run --rm node $(cmd)
```