package team23.smartHomeSimulator.model.request_body;

/** Class used for request bodies related to changing light object */
public class LightRequestBody {
  private String lightName;
  private String roomName;
  private boolean state;

  /**
   * Default constructor
   *
   * @param lightName name of light
   * @param roomName name of room
   * @param state new state of the door
   */
  public LightRequestBody(String lightName, String roomName, boolean state) {
    this.lightName = lightName;
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
   * @return light name as string
   */
  public String getLightName() {
    return lightName;
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
