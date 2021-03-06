package team23.smartHomeSimulator.model;

import java.util.HashMap;

/**
 * The Room class that includes the list of windows, lights, and doors. In addition, it has
 * attributes of room temperature, room number and room name
 */
public class Room {
  /** The room number */
  private String roomNumber;

  /** The room name */
  private String roomName;

  /** The room temperature */
  private double roomTemp;

  /** The number of doors in the room */
  private int numDoors;

  /** The number of windows in the room */
  private int numWindows;

  /** The number of lights in the room */
  private int numLights;

  /** The list of windows with key-value pair */
  private HashMap<String, Window> windows = new HashMap<String, Window>();

  /** The list of doors with key-value pair */
  private HashMap<String, Door> doors = new HashMap<String, Door>();

  /** The list of lights with key-value pair */
  private HashMap<String, Light> lights = new HashMap<String, Light>();

  /**
   * Parameterized constructor
   *
   * @param roomNumber the room number
   * @param roomName the room name
   * @param numWindows the number of windows
   * @param numLights the number of lights
   * @param numDoors the number of doors
   */
  public Room(String roomNumber, String roomName, int numWindows, int numLights, int numDoors) {
    this.roomNumber = roomNumber;
    this.roomName = roomName;
    this.roomTemp = 25;
    this.numLights = numLights;
    this.numWindows = numWindows;
    this.numDoors = numDoors;
    createDoors(numDoors);
    createWindows(numWindows);
    createLights(numLights);
  }

  /**
   * Initialize the doors in the room and makes sure if a room is an outside room to allow the door
   * to be locked
   *
   * @param numDoors the number of doors in a room
   */
  private void createDoors(int numDoors) {
    boolean isExternalDoor =
        this.roomName != null
            && (this.roomName.contains("kitchen") // kitchen door is the deck door
                || this.roomName.contains("garage")
                || this.roomName.contains("living")); // living room door is the entrance door
    for (int i = 0; i < numDoors; i++) {
      this.doors.put(this.getRoomName() + "-d" + (i + 1), new Door(isExternalDoor));
    }
  }

  /**
   * Intialize the windows in the room
   *
   * @param numWindows the number of windows in a room
   */
  private void createWindows(int numWindows) {
    for (int i = 0; i < numWindows; i++) {
      this.windows.put(this.getRoomName() + "-w" + (i + 1), new Window());
    }
  }

  /**
   * Initialize the lights in the room
   *
   * @param numLights the number of lights in a room
   */
  private void createLights(int numLights) {
    for (int i = 0; i < numLights; i++) {
      this.lights.put(this.getRoomName() + "-l" + (i + 1), new Light());
    }
  }

  /**
   * Getter for room temperature
   *
   * @return double
   */
  public double getRoomTemp() {
    return this.roomTemp;
  }

  /**
   * Setter for room temperature
   *
   * @param roomTemp the room temperature
   */
  public void setRoomTemp(double roomTemp) {
    this.roomTemp = roomTemp;
  }

  /**
   * Getter for room number
   *
   * @return string
   */
  public String getRoomNumber() {
    return this.roomNumber;
  }

  /**
   * Getter for room name
   *
   * @return string
   */
  public String getRoomName() {
    return this.roomName;
  }

  /**
   * Getter for number of doors
   *
   * @return int
   */
  public int getNumDoors() {
    return numDoors;
  }

  /**
   * Getter for number of lights
   *
   * @return int
   */
  public int getNumLights() {
    return this.numLights;
  }

  /**
   * Getter for number of windows
   *
   * @return int
   */
  public int getNumWindows() {
    return this.numWindows;
  }

  /**
   * Getter for the list of windows
   *
   * @return hash map
   */
  public HashMap<String, Window> getWindows() {
    return this.windows;
  }

  /**
   * Getter for the list of doors
   *
   * @return hash map
   */
  public HashMap<String, Door> getDoors() {
    return this.doors;
  }

  /**
   * Getter for the list of lights
   *
   * @return hash map
   */
  public HashMap<String, Light> getLights() {
    return this.lights;
  }

  /**
   * Getter for one window
   *
   * @param windowName name of the window we want to get information
   * @return window object
   */
  public Window getOneWindow(String windowName) {
    return this.windows.get(windowName);
  }

  /**
   * Getter for one door
   *
   * @param doorName name of the door we want to get information
   * @return door object
   */
  public Door getOneDoor(String doorName) {
    return this.doors.get(doorName);
  }

  /**
   * Getter for one light
   *
   * @param lightName name of the light we want to get information
   * @return door object
   */
  public Light getOneLight(String lightName) {
    return this.lights.get(lightName);
  }
}
