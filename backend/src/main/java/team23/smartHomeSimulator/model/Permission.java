package team23.smartHomeSimulator.model;

public enum Permission {
  PARENT("Parent"),
  CHILDREN("Children"),
  GUEST("Guest"),
  STRANGER("Stranger");

  private String type;

  Permission(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
