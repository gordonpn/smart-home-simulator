package team23.smartHomeSimulator.model.request_body;

/**
 * Class Used for Editing the profile with same parameters as the ProfileResponseBody class but with
 * oldName as extra parameter parameters are the template for the received JSON
 */
public class EditProfileRequestBody extends ProfileRequestBody {
  private String oldName;

  /**
   * parametrized constructor
   *
   * @param oldName previous name of profile
   * @param name new name of profile
   * @param location new location of profile
   * @param role new role of profile
   * @param permission new permission of profile
   */
  public EditProfileRequestBody(
      String oldName, String name, String location, String role, String permission) {
    super(name, location, role, permission);
    this.oldName = oldName;
  }

  /**
   * get old name
   *
   * @return the old name as string
   */
  public String getOldName() {
    return oldName;
  }
}
