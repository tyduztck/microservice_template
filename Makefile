up:
	docker-compose up -d

down:
	docker-compose down

up-prod: 
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

build-img:
	docker-compose -f docker-compose.yml -f docker-compose.buildimg.yml build