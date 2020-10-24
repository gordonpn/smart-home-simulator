package team23.smartHomeSimulator.model.request_body;

/** Class used for request bodies related to changing window object */
public class WindowRequestBody {
  private String windowName;
  private String roomName;
  private boolean state;

  /**
   * Default constructor
   *
   * @param windowName name of window
   * @param roomName name of room
   * @param state new state of the window
   */
  public WindowRequestBody(String windowName, String roomName, boolean state) {
    this.windowName = windowName;
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
   * get window name
   *
   * @return window name as string
   */
  public String getWindowName() {
    return windowName;
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
