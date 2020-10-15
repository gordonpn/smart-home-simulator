package team23.smartHomeSimulator.model.request_body;

/**
 * Class Used for Editing the profile with same parameters as the ProfileResponseBody class but with
 * oldName as extra parameter parameters are the template for the received JSON
 */
public class EditProfileRequestBody extends ProfileRequestBody {
  private String oldName;

  public EditProfileRequestBody(
      String oldName, String name, String location, String role, String permission) {
    super(name, location, role, permission);
    this.oldName = oldName;
  }

  public String getOldName() {
    return oldName;
  }
}
