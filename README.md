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
# Makefile

# make commands be run with `bash` instead of the default `sh`
SHELL='/bin/bash'

# Setup —————————————————————————————————————————————————————————————————————————
.DEFAULT_GOAL := n

# .DEFAULT: If command does not exist in this makefile
# default:  If no command was specified:
.DEFAULT default:
	if [ "$@" != "" ]; then echo "Command '$@' not found."; fi;
	make help

## —— 🦂  Project Make file  🦂  —————————————————————————————————————————————————————

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Init project ———————————————————————————————————————————————————————————————————
init: docker-down clear docker-pull docker-build npm-install docker-up ready ## Project init

## —— Manage project —————————————————————————————————————————————————————————————————
up: docker-down docker-up ## Project up
down: docker-down ## Project down
restart: down up  ## Project restart


docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

ready:
	docker run --rm -v ${PWD}/app:/app --workdir=/app alpine touch .ready

clear:
	docker run --rm -v ${PWD}/app:/app --workdir=/app alpine rm -f .ready


## —— App —————————————————————————————————————————————————————————————————————————————
n: ## Run node in dir app with params cmd. example 'cmd="npm i"'
	docker-compose run --rm node $(cmd)

npm-install: ## Install node_modules according to the current package-lock.json file
	docker-compose run --rm node npm install

npm-up: ## Run npm command "up"
	docker-compose run --rm node npm run up

npm-dev: ## Run npm command "dev"
	docker-compose run --rm node npm run dev

npm-build: ## Run npm command "build"
	docker-compose run --rm node npm run build

npm-watch: ## Run npm command "watch"
	docker-compose run --rm node npm run watch

npm-analizer: ## Run npm command "analizer"
	docker-compose run --rm node npm run analizer

npm-profile: ## Run npm command "profile"
	docker-compose run --rm node npm run profile
```