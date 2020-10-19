package team23.smartHomeSimulator.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
  public House(HashMap<String, Room> rooms) {
    this.outTemp = 25;
    initializeHouseLayout(rooms);
  }

  /**
   * Instantiate rooms
   *
   * @param rooms hash map of rooms
   */
  private void initializeHouseLayout(HashMap<String, Room> rooms) {
    int roomWidth = 50;
    int livingRoomWidth = 100;
    int diningRoomWidth = 120;
    int kitchenWidth = 80;
    int sublvl0 = 0;
    int sublvl1 = 50;
    int sublvl2 = 100;
    int sublvl3 = 150;

    this.houseCoor.put("doors", new ArrayList<Coordinates>());
    this.houseCoor.put("windows", new ArrayList<Coordinates>());
    this.houseCoor.put("bedrooms", new ArrayList<Coordinates>());
    this.houseCoor.put("dining", new ArrayList<Coordinates>());
    this.houseCoor.put("living", new ArrayList<Coordinates>());
    this.houseCoor.put("kitchen", new ArrayList<Coordinates>());
    this.houseCoor.put("bathrooms", new ArrayList<Coordinates>());
    this.houseCoor.put("dining", new ArrayList<Coordinates>());
    this.houseCoor.put("deck", new ArrayList<Coordinates>());
    this.houseCoor.put("entrance", new ArrayList<Coordinates>());
    this.houseCoor.put("garage", new ArrayList<Coordinates>());

    rooms.forEach(
        (key, room) -> {

          // initialize rooms
          if (key.toLowerCase().contains("bedroom")) {
            int numBedroom = 0;
            int coordX = 0;

            numBedroom = this.houseCoor.get("bedrooms").toArray().length;
            coordX = roomWidth * numBedroom;
            this.houseCoor.get("bedrooms").add(new Coordinates(key, coordX, sublvl0));

            addDoorWindowCoord(room, key, coordX + 10, sublvl0, coordX + 25, sublvl1 - 10);
          } else if (key.toLowerCase().contains("dining")) {

            this.houseCoor.get("dining").add(new Coordinates(key, livingRoomWidth, sublvl1));

            addDoorWindowCoord(
                room,
                key,
                livingRoomWidth + diningRoomWidth - 50,
                sublvl2 - 5,
                livingRoomWidth + 10,
                sublvl2 - 10);

          } else if (key.toLowerCase().contains("living")) {

            this.houseCoor.get("living").add(new Coordinates(key, 0, sublvl1));

            addDoorWindowCoord(room, key, 10, sublvl2 - 5, 40, sublvl2 - 10);

          } else if (key.toLowerCase().contains("kitchen")) {

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

          } else if (key.toLowerCase().contains("bathroom")) {
            this.houseCoor
                .get("bathrooms")
                .add(new Coordinates(key, livingRoomWidth + 30, sublvl2));

            addDoorWindowCoord(
                room, key, livingRoomWidth + 30, sublvl3 - 5, livingRoomWidth + 35, sublvl2);
          } else if (key.toLowerCase().contains("deck")) {
            this.houseCoor
                .get("deck")
                .add(new Coordinates(key, livingRoomWidth + diningRoomWidth, sublvl2));

          } else if (key.toLowerCase().contains("garage")) {
            this.houseCoor
                .get("garage")
                .add(new Coordinates(key, livingRoomWidth + 30 - 80, sublvl2));

          } else if (key.toLowerCase().contains("entrance")) {
            this.houseCoor.get("entrance").add(new Coordinates(key, 0, sublvl2));
          }

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
    if (room.getNumDoors() != 0) {
      this.houseCoor.get("doors").add(new Coordinates(doorX, doorY));
    }

    if (room.getNumWindows() != 0) {
      this.houseCoor.get("windows").add(new Coordinates((key + "-w1"), winX, winY));
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
   * get one specific room based on roomNumber
   * @param roomNumber
   * @return the room
   */
  public Room getOneRoom(String roomNumber){
    return rooms.get(roomNumber);
  }
}
