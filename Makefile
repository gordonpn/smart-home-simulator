.PHONY: client server test format server-watch

client:
	cd ./client && npm run dev

server:
	cd ./backend && ./gradlew bootRun

test:
	cd ./backend && ./gradlew test

format:
	cd ./backend && ./gradlew goJF
