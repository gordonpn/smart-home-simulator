.PHONY: start

start:
	(cd ./backend && ./gradlew bootRun) && (cd ./frontend && nr dev)
