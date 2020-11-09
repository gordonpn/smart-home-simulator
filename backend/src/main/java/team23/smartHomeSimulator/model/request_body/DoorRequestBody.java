package team23.smartHomeSimulator.model.request_body;

/** Class used for request bodies related to changing door object */
public class DoorRequestBody {
  private String doorName;
  private String roomName;
  private boolean state;

  /**
   * Default constructor
   *
   * @param doorName name of window
   * @param roomName name of room
   * @param state new state of the door
   */
  public DoorRequestBody(String doorName, String roomName, boolean state) {
    this.doorName = doorName;
    this.roomName = roomName;
    this.state = state;
  }

  /**
   * get state
   *
   * @return state as boolean
   */
  public boolean getState() {
    return state;
  }

  /**
   * get door name
   *
   * @return window name as string
   */
  public String getDoorName() {
    return doorName;
  }

  /**
   * get room name
   *
   * @return room name as string
   */
  public String getRoomName() {
    return roomName;
  }
}
