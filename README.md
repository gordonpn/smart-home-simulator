# Smart Home Simulator

![Format and Lint](https://github.com/gordonpn/soen343/workflows/Format%20and%20Lint/badge.svg?branch=develop)
![Build and Test Java](https://github.com/gordonpn/soen343/workflows/Build%20and%20Test%20Java/badge.svg)

## Requirements

- At least JDK 11 is required (because of Google Java Format plugin)

## Getting start with development

[Getting Started in Wiki page](https://github.com/gordonpn/soen343/wiki/Getting-Started)

### Backend (server)

**Inside the `backend` folder.**

Start backend for development `./gradlew bootRun`

To automatically format Java code, `./gradlew goJF`

### Frontend (client)

**Inside the `client` folder.**

Start frontend for development `npm run dev`

Format with Prettier `npm run format`

Lint with ESLint `npm run lint`

### House Layout .txt File Format

There are some naming conventions for the room names that are **NECESSARY** to generate the 2D layout. 
This allows the system to identify the room types such as bedroom, kitchen, etc

#### Naming conventions:

- "bedroom" : required as a substring in the room name for naming a bedroom.

- "bathroom" : required as a substring in the room name for naming a bathroom.

- "kitchen" : required as a substring in the room name for naming a kitchen.

- "living" : required as a substring in the room name for naming a living room.

- "deck" : required as a substring in the room name for naming a deck.

- "garage" : required as a substring in the room name for naming a garage.

- "entrance" : required as a substring in the room name for naming a entrance.

- "dining" : required as a substring in the room name for naming a dining.


In addition, some room components are a **MUST** in the text file.

#### Mandatory room components:
- Must have **at least** 1 bedroom.
- Must have **exactly** 1 bathroom
- Must have **exactly** 1 kitchen.
- Must have **exactly** 1 entrance.
- Must have **exactly** 1 living room.
- Must have **exactly** 1 door per room.
- Must have **exactly** 1 window per room.
- Must have **at most** 1 deck.
- Must have **at most** 1 garage.
- Garage, deck, patio, and entrance **don't** have doors and windows

There is a specific format that must be followed to generate the 2D house layout. 
There is a JSON format template in the repo located in the doc folder

#### .txt file format and template

```
{
	"rooms" : {
		
		"Bot1's bedroom" : {
			"roomNumber": "1",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
		"Bot2's bedroom" : {
			"roomNumber": "12",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "Bot3's bedroom" : {
			"roomNumber": "11",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "Bot4's bedroom" : {
			"roomNumber": "2",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "Home-kitchen" : {
			"roomNumber": "23",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "Guests' living room" : {
			"roomNumber": "52",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "The dining room" : {
			"roomNumber": "25",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "Bathroom": {
			"roomNumber": "254",
			"numDoors" : 1,
			"numWindows" : 1,
			"numLights" : 1
		},
    "outside deck": {
			"roomNumber": "532",
			"numLights" : 1
		},
    "home entrance": {
			"roomNumber": "54",
			"numLights" : 1
		},
    "garage": {
			"roomNumber": "94",
			"numLights" : 1
		}
		
	}
}
```

## Authors

| Name                 | GitHub                          |
| -------------------- | ------------------------------- |
| David Liang          | https://github.com/DavidLiang01 |
| Gordon Pham-Nguyen   | https://github.com/gordonpn     |
| Olivier Su           | https://github.com/olivier-su   |
| Radu Stefan Plotoaga | https://github.com/RaduP13      |
| Tigran Karapetyan    | https://github.com/Tigrankar    |
