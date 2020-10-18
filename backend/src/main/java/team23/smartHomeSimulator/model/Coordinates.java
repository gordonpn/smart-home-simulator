package team23.smartHomeSimulator.model;

/** Coordinates class for x and y coordinates in a 2D plane */
public class Coordinates {
  /** The name of the component such as window, door,... */
  private String name;

  /** The x coordinate in the 2D plane */
  private int x;

  /** The y coordinate in the 2D plane */
  private int y;

  /** Default constructor */
  public Coordinates() {}
  ;

  /**
   * Parameterized constructor without name
   *
   * @param x the x coordinate in the 2D plane
   * @param y the y coordinate in the 2D plane
   */
  public Coordinates(int x, int y) {
    this.name = null;
    this.x = x;
    this.y = y;
  }

  /**
   * Parameterized constructor with name
   *
   * @param name the name of the component
   * @param x the x coordinate in the 2D plane
   * @param y the y coordinate in the 2D plane
   */
  public Coordinates(String name, int x, int y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  /**
   * Getter for x coordinate
   *
   * @return integer of x coordinate
   */
  public int getX() {
    return x;
  }

  /**
   * Getter for y coordinate
   *
   * @return integer of y coordinate
   */
  public int getY() {
    return y;
  }

  /**
   * Getter for component name
   *
   * @return name of component as a string
   */
  public String getName() {
    return name;
  }
}
