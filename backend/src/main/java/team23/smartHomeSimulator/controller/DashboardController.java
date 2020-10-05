package team23.smartHomeSimulator.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import team23.smartHomeSimulator.model.Dashboard;

@RestController
public class DashboardController {
  private Dashboard dashboard = new Dashboard();

  public DashboardController() {}

  @GetMapping("/dateTime")
  public String getDateTime() {
    return "Hello" + dashboard.getDateTime().toString();
  }
}
