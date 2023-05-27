install:
	docker compose run --rm acheatmap npm install

run:
	docker compose run --rm --service-ports acheatmap npm start

test:
	npm test

clean:
	rm -rf node_modules
	rm package-lock.json

lint:
	npm run lint
