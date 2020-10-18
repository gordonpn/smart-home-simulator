package team23.smartHomeSimulator.model;

import org.springframework.stereotype.Component;

@Component
public class Dashboard {
  private String dateTime;
  private Boolean isRunning;
  private House house;

  public Dashboard() {
    this.dateTime = "";
    this.isRunning = false;
    this.house = new House();
  }

  public String getDateTime() {
    return dateTime;
  }

  public void setDateTime(String dateTime) {
    this.dateTime = dateTime;
  }

  public Boolean getRunning() {
    return isRunning;
  }

  public void setRunning(Boolean running) {
    isRunning = running;
  }

  public void setHouse(House houseData) {house = houseData;}

  public House getHouse() {return house;}

}
