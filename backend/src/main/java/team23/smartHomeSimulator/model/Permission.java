package team23.smartHomeSimulator.model;

/** Public enum class for Permission */
public enum Permission {
  PARENT("Parent"),
  CHILDREN("Children"),
  GUEST("Guest"),
  STRANGER("Stranger");

  private String type;

  Permission(String type) {
    this.type = type;
  }

  /**
   * Enum constant string value
   *
   * @return string value of enum constant
   */
  public String getType() {
    return type;
  }
}
