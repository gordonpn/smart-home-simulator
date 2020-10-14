package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Dashboard;
import team23.smartHomeSimulator.model.House;

/**
 * The DashboardController allows to call actions inside the various modules such SHH, SHC, and SHP
 */
// @CrossOrigin(origins = "http://localhost:3000")
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

    return new ResponseEntity<String>(json, HttpStatus.OK);
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
