package team23.smartHomeSimulator.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Dashboard;

import java.util.HashMap;
import java.util.Map;

/**
 * The DashboardController allows to call actions inside the various modules such SHH, SHC, and SHP
 */
@RestController
@RequestMapping("/api")
public class DashboardController {

  /** Instantiate the dashboard controller */
  private final Dashboard dashboard;

  /**
   * injection of dependency
   *
   * @param dashboard object
   */
  public DashboardController(Dashboard dashboard) {
    this.dashboard = dashboard;
  }

  /**
   * get the current runningStatus as a boolean
   *
   * @return current state of simulation
   */
  @GetMapping("/running")
  public ResponseEntity<Object> getRunning() {
    Map<String, Boolean> resMap = new HashMap<>();
    resMap.put("runningStatus", dashboard.getRunning());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  /**
   * set running state to true
   *
   * @return 200 OK, no exception handling for now and new status
   */
  @PutMapping("/running")
  public ResponseEntity<Object> runningOn() {
    Map<String, Boolean> resMap = new HashMap<>();
    dashboard.setRunning(true);
    resMap.put("runningStatus", dashboard.getRunning());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  /**
   * set running state to false
   *
   * @return 200 OK, no exception handling for now and new status
   */
  @DeleteMapping("/running")
  public ResponseEntity<Object> runningOff() {
    Map<String, Boolean> resMap = new HashMap<>();
    dashboard.setRunning(false);
    resMap.put("runningStatus", dashboard.getRunning());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  /**
   * updates the date time string in the backend
   *
   * @param requestBody JSON request body in this format { "currentTime": "2020-10-15" }
   * @return the JSON sent from the client
   */
  @PutMapping("/date-time")
  public ResponseEntity<Object> updateDateTime(@RequestBody Map<String, String> requestBody) {
    dashboard.setDateTime(requestBody.get("currentTime"));
    return new ResponseEntity<>(requestBody, HttpStatus.OK);
  }

  /**
   * controller method to return the date time to the frontend
   *
   * @return the date time saved in JSON format
   */
  @GetMapping("/date-time")
  public ResponseEntity<Object> getDateTime() {
    Map<String, String> resMap = new HashMap<>();
    resMap.put("currentTime", dashboard.getDateTime());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }
}
