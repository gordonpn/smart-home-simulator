package team23.smartHomeSimulator.model.request_body;

public class WindowRequestBody {
  private String windowName;
  private String roomName;

  public WindowRequestBody(String windowName, String roomName) {
    this.windowName = windowName;
    this.roomName = roomName;
  }

  public String getWindowName() {
    return windowName;
  }

  public String getRoomName() {
    return roomName;
  }
}
