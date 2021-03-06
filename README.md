# Smart Home Simulator

![Format and Lint](https://github.com/gordonpn/soen343/workflows/Format%20and%20Lint/badge.svg?branch=develop)
![Build and Test Java](https://github.com/gordonpn/soen343/workflows/Build%20and%20Test%20Java/badge.svg)

## Video Demonstration Deliverable 1 (2020-10-20)

<https://youtu.be/vRoCYK2vc2o>

## Video Demonstration Deliverable 2 (2020-11-08)

<https://www.youtube.com/watch?v=MO8AL7TA75Y>

## Video Demonstration Deliverable 3 (2020-12-06)

<https://www.youtube.com/watch?v=W7kpOQxwFcI>

## Explanation of Refactoring and Exception Handling

#### Refactoring
Pull Request IDs: [#122](https://github.com/gordonpn/soen343-team23/pull/122) and [#132](https://github.com/gordonpn/soen343-team23/pull/132)

Classes Involved: house.java, houseController.java, SHP.java, modulesObserver.java, HouseControllerTest.java

JavaScript Files Involved: EditUser.js, RemoveUser.js, HouseStore.js, ProfileStore.js, SHHStore.js, SHPStore.js

In this delivery, we performed 2 refactorings. 

The first refactoring consists of applying the extract method for the initializeHouseLayout method in house.java because this method was too big. We refactored this method by creating other methods such as initializeHouseComponents and createRoom.

The second refactoring consists of removing the observer pattern applied to SHP because there is a simpler way to use the observer pattern in the frontend by using a state management library which automatically notify the components that a change had occured. In this process, we created a store for all 3 modules SHC (HouseStore), SHH (SHHStore), and SHP (SHPStore) and reorganized the methods in the stores so that it reflects the functionalities of each module. In order to use the states of a module, we simply import the store of the module in the file to be used in. 

Tests: 

As a result, we removed some tests associated to the controller because we no longer apply the observer pattern in the backend. To know if our tests passed after doing the refactoring, we can run gradlew test to see if any tests failed or you can look at the section 'Checks' in the PRs.

#### Exception Handling

Pull Request ID: [#131](https://github.com/gordonpn/soen343-team23/pull/131)

Exception Handling Class: HouseLayoutException.java

We added exception handling for handling errors when the users upload the house layout format because the application follows a strict json format in order to successfully generate the 2D house layout. This exception class with look at the mandatory components of a house and their quantities (refer to 'Mandatory room components' section in README.rd).

## Requirements

- At least JDK 11 is required (because of Google Java Format plugin)
- Recent Node.js installed (12+)

## Getting start with development

[Getting Started in Wiki page](https://github.com/gordonpn/soen343/wiki/Getting-Started)

### Instructions

Clone the repository:

`git clone https://github.com/gordonpn/soen343.git`

#### Backend (server)

**Inside the `backend` folder.**

| Step Order | Action                           | Command             |
| ---------- | -------------------------------- | ------------------- |
| 1          | Install dependencies             | `./gradlew build`   |
| 2 optional | Build                            | `./gradlew build`   |
| 3          | Start backend development server | `./gradlew bootRun` |
| 4 optional | Format Java code                 | `./gradlew goJF`    |
| 5          | Run tests                        | `./gradlew test`    |

#### Frontend (client)

**Inside the `client` folder.**

| Step Order    | Action                                       | Command          |
| ------------- | -------------------------------------------- | ---------------- |
| 1             | Install dependencies                         | `npm install`    |
| 2             | Start frontend development server            | `npm run dev`    |
| 2 alternative | Start frontend development server on Windows | `npm run dev2`   |
| 3 optional    | Build                                        | `npm run build`  |
| 4 optional    | Format with Prettier                         | `npm run format` |
| 5 optional    | Lint with ESLint                             | `npm run lint`   |

### Dependencies

#### Gradle

We are using the following plugins:

- Spring Boot Framework
- Google Java Format

We are using the following dependencies:

- Spring Boot Starter Web
- Spring Boot Starter Test

More details can be found in `./backend/build.gradle` file.

#### NPM

We are using the following dependencies:

- Material UI
- Axios
- Konva
- Next
- React
- Zustand

More details can be found in `./client/package.json` file.

### Structure of the Code

The `./client` directory contains the source code that represents the View in MVC architectural pattern.

The `./backend` directory contains the source code that represents the Controller and Model in MVC architectural pattern.

In this architectural pattern, the user interacts with the View, which sends requests to the Controller which processes the request and fetches information from the Model then returns the information to the View for the user.

### Unit Tests

All unit tests can be found in `./backend/src/test/java/team23/smartHomeSimulator/`

There is a unit test for **each** of the controller methods, testing their functionality correctly.

To run the tests, `./backend/gradlew test`

### Coding Standards

Java source code is held up to Google standards with Google Java Format plugin and with CI pipelines.

JavaScript source code is held up to ESLint and Prettier opinionated standards with CI pipelines.

The pipelines can be seen on the Actions tab <https://github.com/gordonpn/soen343/actions>.

## Documentation

### Javadoc

Generated HTML hosted here: <https://gordonpn.github.io/soen343-team23/>

### House Layout .txt File Format

There are some naming conventions for the room names that are **NECESSARY** to generate the 2D layout.
This allows the system to identify the room types such as bedroom, kitchen, etc

#### Naming conventions

- "bedroom" : required as a substring in the room name for naming a bedroom.

- "bathroom" : required as a substring in the room name for naming a bathroom.

- "kitchen" : required as a substring in the room name for naming a kitchen.

- "living" : required as a substring in the room name for naming a living room.

- "deck" : required as a substring in the room name for naming a deck.

- "garage" : required as a substring in the room name for naming a garage.

- "entrance" : required as a substring in the room name for naming a entrance.

- "dining" : required as a substring in the room name for naming a dining room.

In addition, some room components are a **MUST** in the text file.

#### Mandatory room components

- Must have **at least** 1 bedroom.
- Must have **exactly** 1 bathroom
- Must have **exactly** 1 kitchen.
- Must have **exactly** 1 entrance.
- Must have **exactly** 1 living room.
- Must have **at most** 1 deck.
- Must have **at most** 1 garage.

There is a specific format that must be followed to generate the 2D house layout.
There is a JSON format template in the repo located in the doc folder

#### .txt file format and template

```json
{
  "rooms": {
    "Bot1's bedroom": {
      "roomNumber": "1",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "Bot2's bedroom": {
      "roomNumber": "12",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "Bot3's bedroom": {
      "roomNumber": "11",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "Bot4's bedroom": {
      "roomNumber": "2",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "Home-kitchen": {
      "roomNumber": "23",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "Guests' living room": {
      "roomNumber": "52",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "The dining room": {
      "roomNumber": "25",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "Bathroom": {
      "roomNumber": "254",
      "numDoors": 1,
      "numWindows": 1,
      "numLights": 1
    },
    "outside deck": {
      "roomNumber": "532",
      "numLights": 1
    },
    "home entrance": {
      "roomNumber": "54",
      "numLights": 1
    },
    "garage": {
      "roomNumber": "94",
      "numLights": 1
    }
  }
}
```

## Authors

| Name                 | GitHub                            |
| -------------------- | --------------------------------- |
| David Liang          | <https://github.com/DavidLiang01> |
| Gordon Pham-Nguyen   | <https://github.com/gordonpn>     |
| Olivier Su           | <https://github.com/olivier-su>   |
| Radu Stefan Plotoaga | <https://github.com/RaduP13>      |
| Tigran Karapetyan    | <https://github.com/Tigrankar>    |
