package team23.smartHomeSimulator.model;

/**
 * This class is made for instantiating various profile within the smart home dashboard and handle
 * operations related to dashboard functionalities
 */
public class Profile {

  /** The name of the profile */
  private String name;

  /** The Location of the Profile in the house */
  private String location;

  /** The role of the Profile in the House */
  private String role;

  /** Permission level that he profile has access */
  private Permission permission;

  /** Current Status of the Profile, is it he current connected one or not */
  private boolean isActive;

  /**
   * @param name name of the profile
   * @param location assigned to profile being created
   * @param role role attributed to the profile
   * @param permission permission level profile has
   */
  public Profile(String name, String location, String role, Permission permission) {
    this.name = name;
    this.location = location;
    this.role = role;
    this.permission = permission;
    this.isActive = false;
  }

  /** An empty constructor */
  public Profile() {}

  /**
   * Getter for name
   *
   * @return name as string
   */
  public String getName() {
    return name;
  }

  /**
   * Setter for name
   *
   * @param name string
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Getter for location
   *
   * @return location as string
   */
  public String getLocation() {
    return location;
  }

  /**
   * sets the location of the profile
   *
   * @param location string to be set as location
   */
  public void setLocation(String location) {
    this.location = location;
  }

  /**
   * Getter for role
   *
   * @return role as string
   */
  public String getRole() {
    return role;
  }

  /**
   * Setter for role
   *
   * @param role string
   */
  public void setRole(String role) {
    this.role = role;
  }

  /**
   * Getter for permission
   *
   * @return Permission enum
   */
  public Permission getPermission() {
    return permission;
  }

  /**
   * Setter for permission
   *
   * @param permission Enum
   */
  public void setPermission(Permission permission) {
    this.permission = permission;
  }

  /**
   * Getter for active
   *
   * @return boolean
   */
  public boolean isActive() {
    return isActive;
  }

  /**
   * sets the state of the profile in relation to the dashboard
   *
   * @param active boolean to be set as active
   */
  public void setActive(boolean active) {
    isActive = active;
  }
}
