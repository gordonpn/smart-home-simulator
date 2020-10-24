package team23.smartHomeSimulator.model;

import org.springframework.stereotype.Component;

/** Dashboard model object */
@Component
public class Dashboard {
  private String dateTime;
  private Boolean isRunning;

  /** constructor, instantiates by default empty string for date time and false as running status */
  public Dashboard() {
    this.dateTime = "";
    this.isRunning = false;
  }

  /**
   * get date time as string
   *
   * @return datetime string
   */
  public String getDateTime() {
    return dateTime;
  }

  /**
   * set datetime as string
   *
   * @param dateTime datetime as string
   */
  public void setDateTime(String dateTime) {
    this.dateTime = dateTime;
  }

  /**
   * get running status
   *
   * @return running status boolean
   */
  public Boolean getRunning() {
    return isRunning;
  }

  /**
   * set the new running status
   *
   * @param running new running status as boolean
   */
  public void setRunning(Boolean running) {
    isRunning = running;
  }
}
