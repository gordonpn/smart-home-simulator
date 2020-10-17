.PHONY: client server test format server-watch

client:
	cd ./client && npm run dev

server:
	cd ./backend && ./gradlew bootRun

buildc:
	cd ./backend && ./gradlew build --continuous

test:
	cd ./backend && ./gradlew test

format:
	(cd ./backend && ./gradlew goJF); (cd ./client && npm run format)

