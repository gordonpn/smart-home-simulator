package team23.smartHomeSimulator.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import team23.smartHomeSimulator.exception.HouseLayoutException;
import team23.smartHomeSimulator.model.modules.modulesObserver;

/** The House class that includes the outside temperature and the list of rooms */
public class House {

  /** The outside temperature of the house */
  private double outTemp;

  /** The list of rooms in the house */
  private HashMap<String, Room> rooms = new HashMap<String, Room>();

  /** The list of all components' coordinates in 2D plane */
  private HashMap<String, List<Coordinates>> houseCoor = new HashMap<String, List<Coordinates>>();

  /** The list of the observers for house */
  private HashMap<String, modulesObserver> modulesObserver = new HashMap<String, modulesObserver>();

  /** The list of users' location in the house */
  private HashMap<String, String> usersLocation = new HashMap<String, String>();

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

    if (!isHouseLayoutFormatValid(rooms)) {
      throw new HouseLayoutException("Missing some mandatory rooms");
    }

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
            addDoorWindowCoord(room, key, 0, 0, 0, 0);

          } else if (key.toLowerCase().contains("garage")) {
            this.houseCoor
                .get("garage")
                .add(new Coordinates(key, livingRoomWidth + 30 - 80, sublvl2));

            addDoorWindowCoord(room, key, 55, sublvl3 - 25, 50, sublvl3);

          } else if (key.toLowerCase().contains("entrance")) {
            this.houseCoor.get("entrance").add(new Coordinates(key, 0, sublvl2));
            addDoorWindowCoord(room, key, 0, 0, 0, 0);
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

  private boolean isHouseLayoutFormatValid(HashMap<String, Room> rooms) {
    String[] roomsName = rooms.keySet().toArray(new String[0]);

    int numBedroom = 0;
    int numBathroom = 0;
    int numKitchen = 0;
    int numEntrance = 0;
    int numLivingRoom = 0;
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
        && numLivingRoom == 1);
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

  /**
   * Getter for usersLocation
   *
   * @return hash map of type string and string
   */
  public HashMap<String, String> getUsersLocation() {
    return this.usersLocation;
  }

  /**
   * Setter for usersLocation
   *
   * @param name name of the user
   * @param location location of the user
   */
  public void setUsersLocation(String name, String location) {
    this.usersLocation.put(name, location);
    notifyModules();
  }

  /**
   * Remove user from house
   *
   * @param name name of the user to be removed
   */
  public void deleteUsersLocation(String name) {
    this.usersLocation.remove(name);
  }

  /**
   * Add observer to house
   *
   * @param moduleName the name of the module
   * @param module the moduleObserver object
   */
  public void addModuleObserver(String moduleName, modulesObserver module) {
    this.modulesObserver.put(moduleName, module);
  }

  /**
   * Remove observer from house
   *
   * @param moduleName name of the module to be removed
   */
  public void removeModuleObserver(String moduleName) {
    this.modulesObserver.remove(moduleName);
  }

  /** Notify all observers that there is a change */
  private void notifyModules() {
    modulesObserver.forEach(
        (key, value) -> {
          value.update(this);
        });
  }

  /**
   * Getter for modulesObserver
   *
   * @return Hash map of String, modulesObserver
   */
  public HashMap<String, modulesObserver> getModulesObserver() {
    return modulesObserver;
  }
}
