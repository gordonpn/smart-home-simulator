package team23.smartHomeSimulator.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import team23.smartHomeSimulator.exception.HouseLayoutException;

/** The House class that includes the outside temperature and the list of rooms */
public class House {

  /** The outside temperature of the house */
  private double outTemp;

  /** The list of rooms in the house */
  private HashMap<String, Room> rooms = new HashMap<String, Room>();

  /** The list of all components' coordinates in 2D plane */
  private HashMap<String, List<Coordinates>> houseCoor = new HashMap<String, List<Coordinates>>();

  /** Default constructor to deserialize JSON object */
  public House() {}

  /**
   * Pamameterized constructor
   *
   * @param rooms hash map of rooms
   */
  public House(HashMap<String, Room> rooms) throws HouseLayoutException {
    this.outTemp = 25;
    initializeHouseLayout(rooms);
  }

  /**
   * Instantiate rooms
   *
   * @param rooms hash map of rooms
   */
  private void initializeHouseLayout(HashMap<String, Room> rooms) throws HouseLayoutException {
    int roomWidth = 50;
    int livingRoomWidth = 100;
    int diningRoomWidth = 120;
    int kitchenWidth = 80;
    int sublvl0 = 0;
    int sublvl1 = 50;
    int sublvl2 = 100;
    int sublvl3 = 150;

    initializeHouseComponents();

    if (!isHouseLayoutFormatValid(rooms)) {
      throw new HouseLayoutException("Missing some mandatory rooms");
    }

    rooms.forEach(
        (key, room) -> {

          // initialize rooms
          createRoom(
              roomWidth,
              livingRoomWidth,
              diningRoomWidth,
              kitchenWidth,
              sublvl0,
              sublvl1,
              sublvl2,
              sublvl3,
              key,
              room);

          this.rooms.put(
              key,
              new Room(
                  room.getRoomNumber(),
                  key,
                  room.getNumWindows(),
                  room.getNumLights(),
                  room.getNumDoors()));
        });
  }

  private void createRoom(
      int roomWidth,
      int livingRoomWidth,
      int diningRoomWidth,
      int kitchenWidth,
      int sublvl0,
      int sublvl1,
      int sublvl2,
      int sublvl3,
      String key,
      Room room) {
    if (key.toLowerCase().contains("bedroom")) {
      createBedroom(roomWidth, sublvl0, sublvl1, key, room);
    } else if (key.toLowerCase().contains("dining")) {

      createDiningRoom(livingRoomWidth, diningRoomWidth, sublvl1, sublvl2, key, room);

    } else if (key.toLowerCase().contains("living")) {

      createLivingRoom(sublvl1, sublvl2, key, room);

    } else if (key.toLowerCase().contains("kitchen")) {

      createKitchen(livingRoomWidth, diningRoomWidth, kitchenWidth, sublvl1, sublvl2, key, room);

    } else if (key.toLowerCase().contains("bathroom")) {
      createBathroom(livingRoomWidth, sublvl2, sublvl3, key, room);
    } else if (key.toLowerCase().contains("deck")) {
      createDeck(livingRoomWidth, diningRoomWidth, sublvl2, key, room);

    } else if (key.toLowerCase().contains("garage")) {
      createGarage(livingRoomWidth, sublvl2, sublvl3, key, room);

    } else if (key.toLowerCase().contains("entrance")) {
      createEntrance(sublvl2, key, room);
    }
  }

  private void createEntrance(int sublvl2, String key, Room room) {
    this.houseCoor.get("entrance").add(new Coordinates(key, 0, sublvl2));
    addDoorWindowCoord(room, key, 0, 0, 0, 0);
  }

  private void createGarage(int livingRoomWidth, int sublvl2, int sublvl3, String key, Room room) {
    this.houseCoor.get("garage").add(new Coordinates(key, livingRoomWidth + 30 - 80, sublvl2));

    addDoorWindowCoord(room, key, 55, sublvl3 - 25, 50, sublvl3);
  }

  private void createDeck(
      int livingRoomWidth, int diningRoomWidth, int sublvl2, String key, Room room) {
    this.houseCoor
        .get("deck")
        .add(new Coordinates(key, livingRoomWidth + diningRoomWidth, sublvl2));
    addDoorWindowCoord(room, key, 0, 0, 0, 0);
  }

  private void createBathroom(
      int livingRoomWidth, int sublvl2, int sublvl3, String key, Room room) {
    this.houseCoor.get("bathrooms").add(new Coordinates(key, livingRoomWidth + 30, sublvl2));

    addDoorWindowCoord(room, key, livingRoomWidth + 30, sublvl3 - 5, livingRoomWidth + 35, sublvl2);
  }

  private void createKitchen(
      int livingRoomWidth,
      int diningRoomWidth,
      int kitchenWidth,
      int sublvl1,
      int sublvl2,
      String key,
      Room room) {
    this.houseCoor
        .get("kitchen")
        .add(new Coordinates(key, livingRoomWidth + diningRoomWidth, sublvl1));

    addDoorWindowCoord(
        room,
        key,
        livingRoomWidth + diningRoomWidth + 10,
        sublvl2 - 5,
        livingRoomWidth + diningRoomWidth + kitchenWidth - 10,
        sublvl2 - 10);
  }

  private void createLivingRoom(int sublvl1, int sublvl2, String key, Room room) {
    this.houseCoor.get("living").add(new Coordinates(key, 0, sublvl1));

    addDoorWindowCoord(room, key, 10, sublvl2 - 5, 40, sublvl2 - 10);
  }

  private void createDiningRoom(
      int livingRoomWidth, int diningRoomWidth, int sublvl1, int sublvl2, String key, Room room) {
    this.houseCoor.get("dining").add(new Coordinates(key, livingRoomWidth, sublvl1));

    addDoorWindowCoord(
        room,
        key,
        livingRoomWidth + diningRoomWidth - 50,
        sublvl2 - 5,
        livingRoomWidth + 10,
        sublvl2 - 10);
  }

  private void createBedroom(int roomWidth, int sublvl0, int sublvl1, String key, Room room) {
    int numBedroom = 0;
    int coordX = 0;

    numBedroom = this.houseCoor.get("bedrooms").toArray().length;
    coordX = roomWidth * numBedroom;
    this.houseCoor.get("bedrooms").add(new Coordinates(key, coordX, sublvl0));

    addDoorWindowCoord(room, key, coordX + 10, sublvl0, coordX + 25, sublvl1 - 10);
  }

  private void initializeHouseComponents() {
    this.houseCoor.put("doors", new ArrayList<Coordinates>());
    this.houseCoor.put("windows", new ArrayList<Coordinates>());
    this.houseCoor.put("bedrooms", new ArrayList<Coordinates>());
    this.houseCoor.put("dining", new ArrayList<Coordinates>());
    this.houseCoor.put("living", new ArrayList<Coordinates>());
    this.houseCoor.put("kitchen", new ArrayList<Coordinates>());
    this.houseCoor.put("bathrooms", new ArrayList<Coordinates>());
    this.houseCoor.put("lights", new ArrayList<Coordinates>());
    this.houseCoor.put("deck", new ArrayList<Coordinates>());
    this.houseCoor.put("entrance", new ArrayList<Coordinates>());
    this.houseCoor.put("garage", new ArrayList<Coordinates>());
  }

  private boolean isHouseLayoutFormatValid(HashMap<String, Room> rooms) {
    String[] roomsName = rooms.keySet().toArray(new String[0]);

    int numBedroom = 0;
    int numBathroom = 0;
    int numKitchen = 0;
    int numEntrance = 0;
    int numLivingRoom = 0;
    int numDeck = 0;
    int numGarage = 0;
    for (int i = 0; i < roomsName.length; i++) {
      String roomName = roomsName[i].toLowerCase();

      if (roomName.contains("bedroom")) {
        numBedroom++;
      } else if (roomName.contains("bathroom")) {
        numBathroom++;
      } else if (roomName.contains("kitchen")) {
        numKitchen++;
      } else if (roomName.contains("entrance")) {
        numEntrance++;
      } else if (roomName.contains("living room")) {
        numLivingRoom++;
      } else if (roomName.contains("deck")) {
        numDeck++;
      } else if (roomName.contains("deck")) {
        numGarage++;
      }
    }
    String roomString = Arrays.toString(roomsName).toLowerCase();

    return (roomString.contains("bedroom")
        && roomString.contains("bathroom")
        && roomString.contains("kitchen")
        && roomString.contains("entrance")
        && roomString.contains("living room")
        && roomString.contains("deck")
        && numBathroom == 1
        && numBedroom >= 1
        && numEntrance == 1
        && numKitchen == 1
        && numLivingRoom == 1
        && numGarage <= 1
        && numDeck <= 1);
  }

  /**
   * Add doors and windows coordinates to house layout
   *
   * @param room the room object
   * @param winX the x coordinate for window
   * @param winY the y coordinate for window
   * @param doorX the x coordinate for door
   * @param doorY the y coordinate for door
   */
  private void addDoorWindowCoord(Room room, String key, int winX, int winY, int doorX, int doorY) {
    if (room.getNumDoors() != 0
        && !key.equalsIgnoreCase("deck")
        && !key.equalsIgnoreCase("entrance")) {
      this.houseCoor.get("doors").add(new Coordinates((key + "-d1"), doorX, doorY));
    }

    if (room.getNumWindows() != 0
        && !key.equalsIgnoreCase("garage")
        && !key.equalsIgnoreCase("deck")
        && !key.equalsIgnoreCase("entrance")) {
      this.houseCoor.get("windows").add(new Coordinates((key + "-w1"), winX, winY));
    }

    if (room.getNumLights() != 0) {
      this.houseCoor.get("lights").add(new Coordinates((key + "-l1"), 0, 0));
    }
  }

  /**
   * Getter for outside temperature
   *
   * @return double
   */
  public double getOutTemp() {
    return this.outTemp;
  }

  /**
   * Setter for outside temperature
   *
   * @param outTemp the outside temperature
   */
  public void setOutTemp(double outTemp) {
    this.outTemp = outTemp;
  }

  /**
   * Getter for rooms
   *
   * @return Hash map
   */
  public HashMap<String, Room> getRooms() {
    return this.rooms;
  }

  /**
   * Getter for components' coordinates in house
   *
   * @return Hash map of Coordinates
   */
  public HashMap<String, List<Coordinates>> getHouseCoor() {
    return houseCoor;
  }

  /**
   * get one specific room based on roomName
   *
   * @param roomName of the room to get all of its info
   * @return the room
   */
  public Room getOneRoom(String roomName) {
    return rooms.get(roomName);
  }
}
