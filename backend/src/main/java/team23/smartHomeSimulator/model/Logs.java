package team23.smartHomeSimulator.model;

import team23.smartHomeSimulator.model.request_body.LogItem;

import java.util.ArrayList;
import java.util.List;

/** POJO for Logs */
public class Logs {
  private List<LogItem> logs;

  /** Default constructor */
  public Logs() {
    this.logs = new ArrayList<>();
  }

  /**
   * Getter for logs
   *
   * @return logs List
   */
  public List<LogItem> getLogs() {
    return logs;
  }

  /**
   * Setter for logs
   *
   * @param logs list of LogItem
   */
  public void setLogs(List<LogItem> logs) {
    this.logs = logs;
  }

  /** Append to the list of logs @param log LogItem */
  public void add(LogItem log) {
    logs.add(log);
  }
}
