package team23.smartHomeSimulator.model;

/** The Door class is a component of a room */
public class Door {
  /** The state of the door (is the door open?) */
  private boolean isOpen;

  private boolean isLockable;

  /** Default constructor */
  public Door() {
    this.isOpen = false;
    this.isLockable = false;
  }

  public Door(boolean lockable) {
    this.isOpen = false;
    this.isLockable = lockable;
  }
  /**
   * Getter for checking if the door is open
   *
   * @return boolean
   */
  public boolean getIsOpen() {
    return this.isOpen;
  }

  /**
   * Setter for changing the door status
   *
   * @param open the new state of the door
   */
  public void setIsOpen(boolean open) {
    this.isOpen = open;
  }

  /**
   * Getter for checking if the door can be locked
   *
   * @return boolean
   */
  public boolean isLockable() {
    return this.isLockable;
  }
}
