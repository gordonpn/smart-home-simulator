package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.House;

/** Controller for The House Model Class */
@RestController
@RequestMapping("/api")
public class HouseController {

  /** Instantiate the house controller */
  private House house;

  /**
   * Constructor for HouseController
   *
   * <p>public HouseController() {
   *
   * <p>}
   */
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
}
