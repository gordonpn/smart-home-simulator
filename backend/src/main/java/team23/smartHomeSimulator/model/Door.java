package team23.smartHomeSimulator.model;

/** The Door class is a component of a room */
public class Door {
  /** The state of the door (is the door open?) */
  private boolean isOpen;

  private boolean isLockable;

  private boolean isLocked;

  /** Default constructor */
  public Door() {
    this.isOpen = false;
    this.isLockable = false;
    this.isLocked = false;
  }

  public Door(boolean lockable) {
    this.isOpen = false;
    this.isLockable = lockable;
    this.isLocked = false;
  }
  /**
   * Getter for checking if the door is open
   *
   * @return boolean
   */
  public boolean isOpen() {
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

  /**
   * Getter for the locking state of the door
   *
   * @return boolean
   */
  public boolean isLocked() {
    this.isOpen = false;
    return this.isLocked;
  }

  /**
   * Setter for the locking state of the door
   *
   * @param locked locked state boolean
   */
  public void setLocked(boolean locked) {
    this.isLocked = locked;
  }
}
