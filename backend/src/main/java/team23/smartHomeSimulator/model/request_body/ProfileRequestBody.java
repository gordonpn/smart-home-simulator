package team23.smartHomeSimulator.model.request_body;

/** Class Used for Creating Profiles having the parameters as a template for the received JSON */
public class ProfileRequestBody extends LocationChangeRequestBody {
  private String role;
  private String permission;

  /**
   * Default constructor
   *
   * @param name name of new profile
   * @param location location of new profile
   * @param role role of new profile
   * @param permission permission of new profile
   */
  public ProfileRequestBody(String name, String location, String role, String permission) {
    super(name, location);
    this.role = role;
    this.permission = permission;
  }

  /**
   * get role
   *
   * @return role as string
   */
  public String getRole() {
    return role;
  }

  /**
   * get permission
   *
   * @return permission as string
   */
  public String getPermission() {
    return permission;
  }
}
