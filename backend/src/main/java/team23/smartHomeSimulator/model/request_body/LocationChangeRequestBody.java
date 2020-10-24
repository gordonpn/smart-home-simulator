package team23.smartHomeSimulator.model.request_body;

/** Class Used for the RequestParameter when changing Location */
public class LocationChangeRequestBody {
  private String name;
  private String location;

  /**
   * Default constructor
   *
   * @param name name of the profile
   * @param location name of the new location
   */
  public LocationChangeRequestBody(String name, String location) {
    this.name = name;
    this.location = location;
  }

  /**
   * get name of profile
   *
   * @return name as string
   */
  public String getName() {
    return name;
  }

  /**
   * get location
   *
   * @return location as string
   */
  public String getLocation() {
    return location;
  }
}
