package team23.smartHomeSimulator.model;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class Dashboard {
  private LocalDateTime dateTime;
  private Boolean isRunning;

  public Dashboard() {
    this.dateTime = LocalDateTime.now();
    this.isRunning = false;
  }

  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
  }

  public Boolean getRunning() {
    return isRunning;
  }

  public void setRunning(Boolean running) {
    isRunning = running;
  }

  public void toggleRunning() {
    isRunning = !isRunning;
  }
}
