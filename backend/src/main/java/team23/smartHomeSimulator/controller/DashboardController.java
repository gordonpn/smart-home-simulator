package team23.smartHomeSimulator.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Dashboard;

/**
 * The DashboardController allows to call actions inside the various modules such SHH, SHC, and SHP
 */
@RestController
@RequestMapping("/api")
public class DashboardController {

  /** Instantiate the dashboard controller */
  private final Dashboard dashboard;

  public DashboardController(Dashboard dashboard) {
    this.dashboard = dashboard;
  }


  /** @return current state of simulation, true || false */
  @GetMapping("/running")
  public ResponseEntity<Object> getRunning() {
    Map<String, Boolean> resMap = new HashMap<>();
    resMap.put("runningStatus", dashboard.getRunning());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  /**
   * set running state to true
   *
   * @return 200 OK, no exception handling for now
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
   * @return 200 OK, no exception handling for now
   */
  @DeleteMapping("/running")
  public ResponseEntity<Object> runningOff() {
    Map<String, Boolean> resMap = new HashMap<>();
    dashboard.setRunning(false);
    resMap.put("runningStatus", dashboard.getRunning());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  /**
   * @param requestBody JSON request body in this format { "currentTime": "2020-10-15" }
   * @return the JSON sent from the client
   */
  @PutMapping("/date-time")
  public ResponseEntity<Object> updateDateTime(@RequestBody Map<String, String> requestBody) {
    dashboard.setDateTime(requestBody.get("currentTime"));
    return new ResponseEntity<>(requestBody, HttpStatus.OK);
  }

  /** @return the date time saved in JSON format */
  @GetMapping("/date-time")
  public ResponseEntity<Object> getDateTime() {
    Map<String, String> resMap = new HashMap<>();
    resMap.put("currentTime", dashboard.getDateTime());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  @GetMapping("/rooms")
  public ResponseEntity<Object> getRooms() {
    Map<String, HashMap> resMap = new HashMap<>();
    resMap.get(dashboard.getHouse().getRooms());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  @PutMapping("/rooms/windows")
  public ResponseEntity<Object> getWindows(@RequestBody Map<String, String> requestBody) {
    String roomNumber = requestBody.get("roomNumber");
    Map<String, HashMap> resMap =new HashMap<>();
    resMap.put("Windows", dashboard.getHouse().getOneRoom(roomNumber).getWindows());
    return new ResponseEntity<>(resMap, HttpStatus.OK);
  }

  @PutMapping("/rooms/windows/block-window")
  public ResponseEntity<Object> blockWindow(@RequestBody Map<String, String> requestBody) {
    String windowNumber = requestBody.get("windowNumber");
    String roomNumber = requestBody.get("roomNumber");
    dashboard.getHouse().getOneRoom(roomNumber).getOneWindow(windowNumber).setIsBlocked(true);
    return new ResponseEntity<>(windowNumber, HttpStatus.OK);
  }

}
