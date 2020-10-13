package team23.smartHomeSimulator.controller;

import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Dashboard;

@RestController
@RequestMapping("/api")
public class DashboardController {

  private final Dashboard dashboard;

  public DashboardController(Dashboard dashboard) {
    this.dashboard = dashboard;
  }

  /** @return current state of simulation, true || false */
  @GetMapping("/running")
  public Boolean getRunning() {
    return dashboard.getRunning();
  }

  /** set running state to true */
  @PutMapping("/running")
  public void runningOn() {
    dashboard.setRunning(true);
  }

  /** set running state to false */
  @DeleteMapping("/running")
  public void runningOff() {
    dashboard.setRunning(false);
  }
}
