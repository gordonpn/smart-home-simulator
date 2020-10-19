package team23.smartHomeSimulator.model;

/** The Window class is component of a room */
public class Window {

  /** The status of the window (is it open?) */
  private boolean isOpen;

  /** The state of the window (is it blocked?) */
  private boolean isBlocked;

  /** Default constructor */
  public Window() {
    this.isBlocked = false;
    this.isOpen = false;
  }

  /**
   * Getter for checking if the window is open
   *
   * @return boolean
   */
  public boolean getIsOpen() {
    return this.isOpen;
  }

  /**
   * Getter for checking if the window is block
   *
   * @return boolean
   */
  public boolean getIsBlocked() {
    return this.isBlocked;
  }

  /**
   * Setter for changing the window block status
   *
   * @param blocked the new state of isBlocked
   */
  public void setIsBlocked(boolean blocked) {
    this.isBlocked = blocked;
  }

  /**
   * Setter for changing the window open status
   *
   * @param open the new state of isOpen
   */
  public void setIsOpen(boolean open) {
    if (this.isBlocked == false) {
      this.isOpen = open;
    }
  }
}
