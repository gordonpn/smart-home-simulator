package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Dashboard;
import team23.smartHomeSimulator.model.House;

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

  /**
   * Create the house object
   *
   * @param houseData data of the house
   * @return HTTP Response status and house layout json
   * @throws JsonProcessingException Exception thrown for parsing json
   */
  @PostMapping("/uploadHouse")
  public ResponseEntity<String> createHouseLayout(@RequestBody House houseData)
      throws JsonProcessingException {
    House house = new House(houseData.getRooms());
    ObjectMapper mapper = new ObjectMapper();
    String json = mapper.writeValueAsString(house);

    return new ResponseEntity<>(json, HttpStatus.OK);
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
}
