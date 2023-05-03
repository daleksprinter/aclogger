install:
	docker compose run --rm acheatmap npm install

run:
	docker compose run --rm --service-ports acheatmap npm start
