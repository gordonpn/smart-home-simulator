package team23.smartHomeSimulator.model;

public enum ProtectedAction {
  WINDOWS("windows"),
  UNLOCK_DOORS("(un)locking doors"),
  GARAGE("opening garage door"),
  LIGHTS("lights"),
  AWAY("setting away mode");

  private String description;

  ProtectedAction(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
