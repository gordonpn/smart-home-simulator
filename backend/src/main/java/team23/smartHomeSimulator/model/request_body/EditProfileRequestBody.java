package team23.smartHomeSimulator.model.request_body;

/**
 * Class Used for Editing the profile with same parameters as the ProfileResponseBody class but with
 * oldName as extra parameter parameters are the template for the received JSON
 */
public class EditProfileRequestBody {
  private String oldName;
  private String name;
  private String location;
  private String role;
  private String permission;

  public EditProfileRequestBody(
      String oldName, String name, String location, String role, String permission) {
    this.oldName = oldName;
    this.name = name;
    this.location = location;
    this.role = role;
    this.permission = permission;
  }

  public String getOldName() {
    return oldName;
  }

  public String getName() {
    return name;
  }

  public String getLocation() {
    return location;
  }

  public String getRole() {
    return role;
  }

  public String getPermission() {
    return permission;
  }
}
