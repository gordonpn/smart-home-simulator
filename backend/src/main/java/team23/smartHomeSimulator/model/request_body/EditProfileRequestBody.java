package team23.smartHomeSimulator.model.request_body;

/**
 * Class Used for Editing the profile with same parameters as the ProfileResponseBody class but with
 * oldName as extra parameter parameters are the template for the received JSON
 */
public class EditProfileRequestBody {
  public String oldName;
  public String name;
  public String location;
  public String role;
  public String permission;

  public EditProfileRequestBody(
      String oldName, String name, String location, String role, String permission) {
    this.oldName = oldName;
    this.name = name;
    this.location = location;
    this.role = role;
    this.permission = permission;
  }
}
