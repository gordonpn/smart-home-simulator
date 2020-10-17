package team23.smartHomeSimulator.model.request_body;

/** Class Used for Creating Profiles having the parameters as a template for the received JSON */
public class ProfileRequestBody extends LocationChangeRequestBody {
  private String role;
  private String permission;

  public ProfileRequestBody(String name, String location, String role, String permission) {
    super(name, location);
    this.role = role;
    this.permission = permission;
  }

  public String getRole() {
    return role;
  }

  public String getPermission() {
    return permission;
  }
}
