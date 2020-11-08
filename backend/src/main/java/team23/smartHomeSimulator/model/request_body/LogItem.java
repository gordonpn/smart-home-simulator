package team23.smartHomeSimulator.model.request_body;

/** POJO for individual log items */
public class LogItem {
  private String timestamp;
  private String message;
  private String module;

  /** Default constructor */
  public LogItem() {}

  /**
   * Parametrized constructor
   *
   * @param timestamp timestamp
   * @param message log message
   * @param module module which the log belongs to
   */
  public LogItem(String timestamp, String message, String module) {
    this.timestamp = timestamp;
    this.message = message;
    this.module = module;
  }

  /**
   * Getter for timestamp
   *
   * @return timestamp string
   */
  public String getTimestamp() {
    return timestamp;
  }

  /**
   * Setter for timestamp
   *
   * @param timestamp timestamp string
   */
  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  /**
   * Getter for message
   *
   * @return message string
   */
  public String getMessage() {
    return message;
  }

  /**
   * Setter for message
   *
   * @param message message string
   */
  public void setMessage(String message) {
    this.message = message;
  }

  /**
   * Getter for module
   *
   * @return module string
   */
  public String getModule() {
    return module;
  }

  /**
   * Setter for module
   *
   * @param module module string
   */
  public void setModule(String module) {
    this.module = module;
  }
}
