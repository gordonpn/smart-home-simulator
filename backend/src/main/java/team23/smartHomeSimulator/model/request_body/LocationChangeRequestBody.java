package team23.smartHomeSimulator.model.request_body;

/** Class Used for the RequestParameter when changing Location */
public class LocationChangeRequestBody {
  public String name;
  public String location;

  public LocationChangeRequestBody(String name, String location) {
    this.name = name;
    this.location = location;
  }
}
