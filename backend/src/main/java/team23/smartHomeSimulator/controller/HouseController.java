package team23.smartHomeSimulator.controller;

import static team23.smartHomeSimulator.controller.ProfileController.getActiveProfile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.*;
import team23.smartHomeSimulator.model.Door;
import team23.smartHomeSimulator.model.House;
import team23.smartHomeSimulator.model.modules.SHP;
import team23.smartHomeSimulator.model.request_body.DoorRequestBody;
import team23.smartHomeSimulator.model.request_body.LightRequestBody;
import team23.smartHomeSimulator.model.request_body.LocationChangeRequestBody;
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
    this.house.addModuleObserver("SHP", new SHP());

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
    Room thisRoom = house.getOneRoom(requestBody.getRoomName());
    Door thisDoor = thisRoom.getOneDoor(requestBody.getDoorName());
    if (!thisDoor.isLockable()) {
      Map<String, String> response =
          ErrorResponse.getCustomError(
              String.format("Cannot lock this door %s", requestBody.getDoorName()));
      return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    if (!permissionService.isAllowed(getActiveProfile(), ProtectedAction.UNLOCK_DOORS, thisRoom)) {
      return new ResponseEntity<>(
          ErrorResponse.getPermissionError(getActiveProfile(), ProtectedAction.UNLOCK_DOORS),
          HttpStatus.FORBIDDEN);
    }
    if (requestBody.getState()) {
      thisDoor.setIsOpen(false);
    }
    thisDoor.setLocked(requestBody.getState());
    return new ResponseEntity<>(
        house.getOneRoom(requestBody.getRoomName()).getDoors(), HttpStatus.OK);
  }

  /**
   * open window
   *
   * @param requestBody object
   * @return room windows information
   */
  @PutMapping("/rooms/windows/open-window")
  public ResponseEntity<Object> openWindow(@RequestBody WindowRequestBody requestBody) {
    Room thisRoom = house.getOneRoom(requestBody.getRoomName());
    Window thisWindow = thisRoom.getOneWindow(requestBody.getWindowName());
    if (thisWindow.isBlocked()) {
      Map<String, String> response =
          ErrorResponse.getCustomError(
              String.format(
                  "Cannot %s this window %s because it is blocked",
                  requestBody.getState(), requestBody.getWindowName()));
      return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    if (!permissionService.isAllowed(getActiveProfile(), ProtectedAction.WINDOWS, thisRoom)) {
      return new ResponseEntity<>(
          ErrorResponse.getPermissionError(getActiveProfile(), ProtectedAction.WINDOWS),
          HttpStatus.FORBIDDEN);
    }

    thisWindow.setIsOpen(requestBody.getState());
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
    boolean isGarage = requestBody.getRoomName().toLowerCase().contains("garage");
    Room thisRoom = house.getOneRoom(requestBody.getRoomName());
    Door thisDoor = thisRoom.getOneDoor(requestBody.getDoorName());
    if (isGarage) {
      if (!permissionService.isAllowed(getActiveProfile(), ProtectedAction.GARAGE, thisRoom)) {
        return new ResponseEntity<>(
            ErrorResponse.getPermissionError(getActiveProfile(), ProtectedAction.GARAGE),
            HttpStatus.FORBIDDEN);
      }
    }
    thisDoor.setIsOpen(requestBody.getState());
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
    Room thisRoom = house.getOneRoom(requestBody.getRoomName());
    if (permissionService.isAllowed(getActiveProfile(), ProtectedAction.LIGHTS, thisRoom)) {
      Light thisLight = thisRoom.getOneLight(requestBody.getLightName());
      thisLight.setIsOn(requestBody.getState());
      return new ResponseEntity<>(
          house.getOneRoom(requestBody.getRoomName()).getLights(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(
          ErrorResponse.getPermissionError(getActiveProfile(), ProtectedAction.LIGHTS),
          HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Add or modify user's location in the house
   *
   * @param user Object of type LocationChangeRequestBody
   * @return object containing the new location of the user
   */
  @PutMapping("/house-users")
  public ResponseEntity<Object> setUserLocation(@RequestBody LocationChangeRequestBody user) {
    house.setUsersLocation(user.getName(), user.getLocation());
    LocationChangeRequestBody userLocation =
        new LocationChangeRequestBody(user.getName(), house.getUsersLocation().get(user.getName()));
    return new ResponseEntity<>(userLocation, HttpStatus.OK);
  }

  /**
   * Delete user from house
   *
   * @param name the name of the user to be removed
   * @return Message indicating if user was removed successfully
   */
  @DeleteMapping("/house-users")
  public ResponseEntity<Object> removeUserLocation(@RequestParam(name = "name") String name) {
    house.deleteUsersLocation(name);
    String success = house.getUsersLocation().get(name) == null ? "successfully" : "unsuccessfully";
    return new ResponseEntity<>("Removed " + name + " " + success, HttpStatus.OK);
  }


  /**
   * when awayMode is on, lights in specific rooms will turn on for a given amount of time
   *
   * @param requestBody
   * @param startTimeString
   * @param endTimeString
   * @return light that is turned on
   */
  @PutMapping("/awayMode-lights")
  public ResponseEntity<Object> setAwayModeLight(@RequestBody LightRequestBody requestBody, @RequestParam(name = "startTime") String startTimeString, @RequestParam(name = "endTime") String endTimeString ){
    SHP shp = (SHP) house.getModulesObserver().get("SHP");
    boolean awayMode = shp.getIsAwayModeOn();

    Room thisRoom = house.getOneRoom(requestBody.getRoomName());

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime startTime = LocalDateTime.parse(startTimeString, formatter);
    LocalDateTime endTime = LocalDateTime.parse(endTimeString, formatter);
    LocalDateTime currentTime = LocalDateTime.now();

    int compareValue1 = startTime.compareTo(currentTime);
    int compareValue2 = endTime.compareTo(currentTime);

    if(awayMode && permissionService.isAllowed(getActiveProfile(), ProtectedAction.LIGHTS, thisRoom)){
      if(compareValue1 < 0){
        while(compareValue1 < 0){ }
        Light thisLight = thisRoom.getOneLight(requestBody.getLightName());
        thisLight.setIsOn(requestBody.getState());
        return new ResponseEntity<>(
                house.getOneRoom(requestBody.getRoomName()).getLights(), HttpStatus.OK);
      } else if (compareValue1 > 0 && compareValue2 < 0) {
        Light thisLight = thisRoom.getOneLight(requestBody.getLightName());
        thisLight.setIsOn(requestBody.getState());
        return new ResponseEntity<>(
                house.getOneRoom(requestBody.getRoomName()).getLights(), HttpStatus.OK);

      } else if (compareValue2 < 0) {
        while (compareValue2 < 0) {
        }
        Light thisLight = thisRoom.getOneLight(requestBody.getLightName());
        thisLight.setIsOn(requestBody.getState());
        return new ResponseEntity<>(
                house.getOneRoom(requestBody.getRoomName()).getLights(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      }
    }else {
      return new ResponseEntity<>(
              ErrorResponse.getPermissionError(getActiveProfile(), ProtectedAction.LIGHTS),
              HttpStatus.FORBIDDEN);
    }
  }
}
