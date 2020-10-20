package team23.smartHomeSimulator.model.request_body;

public class WindowRequestBody {
  private String windowName;
  private String roomName;
  private boolean state;

  public WindowRequestBody(String windowName, String roomName, boolean state) {
    this.windowName = windowName;
    this.roomName = roomName;
    this.state = state;
  }

  public boolean getState() {
    return state;
  }

  public String getWindowName() {
    return windowName;
  }

  public String getRoomName() {
    return roomName;
  }
}
