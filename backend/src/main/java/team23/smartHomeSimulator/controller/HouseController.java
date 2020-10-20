package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.House;
import team23.smartHomeSimulator.model.request_body.WindowRequestBody;

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
   * @param roomName
   * @return all windows in a specific room and OK status
   */
  @GetMapping("/rooms/windows")
  public ResponseEntity<Object> getWindows(@RequestParam(name = "roomName") String roomName) {
    return new ResponseEntity<>(house.getOneRoom(roomName).getWindows(), HttpStatus.OK);
  }

  /**
   * block window
   *
   * @param requestBody with windowName and roomName
   * @return room windows information
   */
  @PutMapping("/rooms/windows/block-window")
  public ResponseEntity<Object> blockWindow(@RequestBody WindowRequestBody requestBody) {
    house
        .getOneRoom(requestBody.getRoomName())
        .getOneWindow(requestBody.getWindowName())
        .setIsBlocked(requestBody.getState());
    return new ResponseEntity<>(
        house.getOneRoom(requestBody.getRoomName()).getWindows(), HttpStatus.OK);
  }
}
