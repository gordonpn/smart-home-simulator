package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Door;
import team23.smartHomeSimulator.model.House;
import team23.smartHomeSimulator.model.request_body.DoorRequestBody;
import team23.smartHomeSimulator.model.request_body.LightRequestBody;
import team23.smartHomeSimulator.model.request_body.WindowRequestBody;
import team23.smartHomeSimulator.service.PermissionService;
import team23.smartHomeSimulator.utility.ErrorResponse;

/** Controller for The House Model Class */
@RestController
@RequestMapping("/api")
public class HouseController {

  private final PermissionService permissionService;
  private House house;

  /**
   * Constructor for dependency injection
   *
   * @param permissionService the permission service
   */
  public HouseController(PermissionService permissionService) {
    this.permissionService = permissionService;
  }

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
   * updates the outside temperature in the backend
   *
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
   * @param roomName is the room name for which we'd like to get all windows
   * @return all windows in a specific room and OK status
   */
  @GetMapping("/rooms/windows")
  public ResponseEntity<Object> getWindows(@RequestParam(name = "roomName") String roomName) {
    return new ResponseEntity<>(house.getOneRoom(roomName).getWindows(), HttpStatus.OK);
  }

  /**
   * block window
   *
   * @param requestBody object
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

  /**
   * lock door
   *
   * @param requestBody object
   * @return room door information
   */
  @PutMapping("/rooms/doors/lock-door")
  public ResponseEntity<Object> lockDoor(@RequestBody DoorRequestBody requestBody) {
    Door thisDoor =
        house.getOneRoom(requestBody.getRoomName()).getOneDoor(requestBody.getDoorName());
    if (thisDoor.isLockable()) {
      thisDoor.setLocked(requestBody.getState());
      return new ResponseEntity<>(
          house.getOneRoom(requestBody.getRoomName()).getDoors(), HttpStatus.OK);
    } else {
      Map<String, String> response =
          ErrorResponse.getCustomError(
              String.format("Cannot lock this door %s", requestBody.getDoorName()));
      return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
  }

  /**
   * open window
   *
   * @param requestBody object
   * @return room windows information
   */
  @PutMapping("/rooms/windows/open-window")
  public ResponseEntity<Object> openWindow(@RequestBody WindowRequestBody requestBody) {
    house
        .getOneRoom(requestBody.getRoomName())
        .getOneWindow(requestBody.getWindowName())
        .setIsOpen(requestBody.getState());
    return new ResponseEntity<>(
        house.getOneRoom(requestBody.getRoomName()).getWindows(), HttpStatus.OK);
  }

  /**
   * open door
   *
   * @param requestBody object
   * @return room door information
   */
  @PutMapping("/rooms/doors/open-door")
  public ResponseEntity<Object> openDoor(@RequestBody DoorRequestBody requestBody) {
    house
        .getOneRoom(requestBody.getRoomName())
        .getOneDoor(requestBody.getDoorName())
        .setIsOpen(requestBody.getState());
    return new ResponseEntity<>(
        house.getOneRoom(requestBody.getRoomName()).getDoors(), HttpStatus.OK);
  }

  /**
   * open light
   *
   * @param requestBody object
   * @return room light information
   */
  @PutMapping("/rooms/lights/open-light")
  public ResponseEntity<Object> openLight(@RequestBody LightRequestBody requestBody) {
    house
        .getOneRoom(requestBody.getRoomName())
        .getOneLight(requestBody.getLightName())
        .setIsOn(requestBody.getState());
    return new ResponseEntity<>(
        house.getOneRoom(requestBody.getRoomName()).getLights(), HttpStatus.OK);
  }
}
