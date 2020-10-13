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
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DashboardController {
    /**
     * Instantiate the dashboard controller
     */
    private Dashboard dashboard=new Dashboard();


    /**
     * Default constructor
     */
    public DashboardController() {
    }

    /**
     * Get the current time
     * @return dateTime
     */
    @GetMapping("/dateTime")
    public String getDateTime() {
        return "Hello "+dashboard.getDateTime().toString();
    }

    /**
     * Create the house object
     * @param houseData data of the house
     * @return HTTP Response status and house layout json
     * @throws JsonProcessingException Exception thrown for parsing json
     */
    @PostMapping("/uploadHouse")
    public ResponseEntity<String> createHouseLayout(@RequestBody House houseData) throws JsonProcessingException {
        House house = new House(houseData.getRooms());
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(house);

        return new ResponseEntity<String>(json, HttpStatus.OK);
    }



}
