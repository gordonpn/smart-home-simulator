package team23.smartHomeSimulator.model.modules;

import java.util.HashMap;
import java.util.Map;
import team23.smartHomeSimulator.model.House;

/** Class for SHP module */
public class SHP extends modulesObserver {

  /** Attribute indicating if away mode is on */
  private boolean awayModeOn;
  /** Name of the module */
  private String moduleName;

  public SHP() {
    this.moduleName = "SHP";
    this.awayModeOn = false;
  }

  /**
   * Getter for module name
   *
   * @return module name as String
   */
  public String getModuleName() {
    return moduleName;
  }

  /**
   * Getter for awayModeOn
   *
   * @return state of awayMode as boolean
   */
  public boolean getIsAwayModeOn() {
    return awayModeOn;
  }

  /**
   * Setter for awayModeOn
   *
   * @param awayModeOn boolean representing the state
   */
  public void setAwayModeOn(boolean awayModeOn) {
    this.awayModeOn = awayModeOn;
  }

  /**
   * Update the awayMode if all users are outside the house
   *
   * @param house the house object representing the house layout
   */
  public void update(House house) {
    HashMap<String, String> userLocation = house.getUsersLocation();
    this.setAwayModeOn(true);
    for (Map.Entry<String, String> entry : userLocation.entrySet()) {
      String value = entry.getValue();

      if (!value.equalsIgnoreCase("outside")) {
        this.setAwayModeOn(false);
        break;
      }
    }

    if (this.getIsAwayModeOn()) {
      // send command to SHC
    }
  }
}
