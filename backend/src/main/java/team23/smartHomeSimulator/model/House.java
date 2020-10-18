package team23.smartHomeSimulator.model;

import java.util.HashMap;

/** The House class that includes the outside temperature and the list of rooms */
public class House {

  /** The outside temperature of the house */
  private double outTemp;

  /** The list of rooms in the house */
  private HashMap<String, Room> rooms = new HashMap<String, Room>();

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
    rooms.forEach(
        (key, room) -> {
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
   * Get one room
   *
   * @return Room
   */
  public Room getOneRoom(String roomName){
    Room room = rooms.get(roomName);
    return room;
  }
}
