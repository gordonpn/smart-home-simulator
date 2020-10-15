package team23.smartHomeSimulator.model.request_body;

/** Class Used for Creating Profiles having the parameters as a template for the received JSON */
public class ProfileRequestBody {
  public String name;
  public String location;
  public String role;
  public String permission;

  public ProfileRequestBody(String name, String location, String role, String permission) {
    this.name = name;
    this.location = location;
    this.role = role;
    this.permission = permission;
  }
}
