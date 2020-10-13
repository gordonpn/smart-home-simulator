.PHONY: client server

client:
	cd ./client && npm run dev

server:
	cd ./backend && ./gradlew bootRun

test:
	cd ./backend && ./gradlew test
