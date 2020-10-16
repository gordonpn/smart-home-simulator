package team23.smartHomeSimulator.model.request_body;

/** Class Used for the RequestParameter when changing Location */
public class LocationChangeRequestBody {
  private String name;
  private String location;

  public LocationChangeRequestBody(String name, String location) {
    this.name = name;
    this.location = location;
  }

  public String getName() {
    return name;
  }

  public String getLocation() {
    return location;
  }
}
