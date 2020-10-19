package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.House;

import java.util.HashMap;
import java.util.Map;

/** Controller for The House Model Class */
@RestController
@RequestMapping("/api")
public class HouseController {

  /** Instantiate the house controller */
  private House house;

  /**
   * Create the house object
   *
   * @param houseData data of the house
   * @return HTTP Response status and house layout json
   * @throws JsonProcessingException Exception thrown for parsing json
   */
  @PostMapping("/upload-house")
  public ResponseEntity<String> createHouseLayout(@RequestBody House houseData)
      throws JsonProcessingException {
    this.house = new House(houseData.getRooms());
    ObjectMapper mapper = new ObjectMapper();
    String json = mapper.writeValueAsString(house);

    return new ResponseEntity<>(json, HttpStatus.OK);
  }

  /**
   * @param requestBody JSON request body in this format {"outTemp": 20}
   * @return the new outside house temperature
   */
  @PutMapping("/outside-temperature")
  public ResponseEntity<Object> updateTemperature(@RequestBody House requestBody) {
    house.setOutTemp(requestBody.getOutTemp());
    return new ResponseEntity<>(house, HttpStatus.OK);
  }

  /**
   * http response with all rooms
   *
   * @return all rooms and OK status
   */
  @GetMapping("/rooms")
  public ResponseEntity<Object> getRooms() {
    return new ResponseEntity<>(house.getRooms(), HttpStatus.OK);
  }

  /**
   * http response with all windows of a specific room
   *
   * @param roomNumber
   * @return all windows ina specific room and OK status
   */
  @GetMapping("/rooms/windows")
  public ResponseEntity<Object> getWindows(@RequestParam(name = "roomNumber") String roomNumber) {
    return new ResponseEntity<>(house.getOneRoom(roomNumber).getWindows(), HttpStatus.OK);
  }

  /**
   * block a window
   * @param requestBody
   * @return window number and OK status
   */
  @PutMapping("/rooms/windows/block-window")
  public ResponseEntity<Object> blockWindow(@RequestBody Map<String, String> requestBody) {
    String windowNumber = requestBody.get("windowNumber");
    String roomNumber = requestBody.get("roomNumber");
    house.getOneRoom(roomNumber).getOneWindow(windowNumber).setIsBlocked(true);
    return new ResponseEntity<>(windowNumber, HttpStatus.OK);
  }

  /**
   * unblock window
   * @param requestBody
   * @return
   */
  @DeleteMapping("/rooms/windows/block-window")
  public ResponseEntity<Object> unblockWindow(@RequestBody Map<String, String> requestBody) {
    String windowNumber = requestBody.get("windowNumber");
    String roomNumber = requestBody.get("roomNumber");
    house.getOneRoom(roomNumber).getOneWindow(windowNumber).setIsBlocked(false);
    return new ResponseEntity<>(windowNumber, HttpStatus.OK);
  }
}
