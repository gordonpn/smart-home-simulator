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

  @GetMapping("/running")
  public Boolean getRunning() {
    return dashboard.getRunning();
  }

  @PutMapping("/running")
  public void runningOn() {
    dashboard.setRunning(true);
  }

  @DeleteMapping("/running")
  public void runningOff() {
    dashboard.setRunning(false);
  }
}
