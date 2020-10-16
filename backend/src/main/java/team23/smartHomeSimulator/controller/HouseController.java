package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.House;

@RestController
@RequestMapping("/api")
public class HouseController {

    private House house;

    public HouseController() {

    }

    @PostMapping("/uploadHouse")
    public ResponseEntity<String> createHouseLayout(@RequestBody House houseData)
            throws JsonProcessingException {
        this.house = new House(houseData.getRooms());
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(house);

        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @PutMapping("/outside-temperature")
    public ResponseEntity<Object> updateTemperature(@RequestBody House requestBody){
        house.setOutTemp(requestBody.getOutTemp());
        return new ResponseEntity<>(house, HttpStatus.OK);
    }

}
