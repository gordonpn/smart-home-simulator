package team23.smartHomeSimulator.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/** The House class that includes the outside temperature and the list of rooms */
public class House {

  /** The outside temperature of the house */
  private double outTemp;

  /** The list of rooms in the house */
  private HashMap<String, Room> rooms = new HashMap<String, Room>();

  private HashMap<String,List<Coordinates>> houseCoor = new HashMap<String, List<Coordinates>>();

  /** Default constructor to deserialize JSON object */
  public House() {}

  /**
   * Pamameterized constructor
   *
   * @param rooms hash map of rooms
   */
  public House(HashMap<String, Room> rooms) {
    this.outTemp = 25;
    initializeHouseLayout(rooms);
  }

  /**
   * Instantiate rooms
   *
   * @param rooms hash map of rooms
   */
  private void initializeHouseLayout(HashMap<String, Room> rooms) {
    int roomWidth= 50;
    int fixHeight = 50;
    int livingRoomWidth = 100;
    int diningRoomWidth = 120;
    int kitchenWidth = 80;

    final int[] bedroomCount = {0};
    final int[] bedroomX = {0};
    int bedroomY =0;

    rooms.forEach(
        (key, room) -> {

          //initialize rooms
          if(key.toLowerCase().contains("bedroom")){

            if(!this.houseCoor.containsKey("bedrooms")){
              this.houseCoor.put("bedrooms", new ArrayList<Coordinates>());
//              this.houseCoor.get("rooms").add(new Coordinates(roomWidth * bedroomCount[0],bedroomY));
            }
            this.houseCoor.get("bedrooms").add(new Coordinates(roomWidth * this.houseCoor.get("bedrooms").toArray().length,bedroomY));

//            this.rooms.put(
//                    key,
//                    new Room(
//                            room.getRoomNumber(),
//                            key,
//                            room.getNumWindows(),
//                            room.getNumLights(),
//                            room.getNumDoors(),roomWidth* bedroomCount[0],bedroomY));
            bedroomCount[0]++;
          }
          else if(key.toLowerCase().contains("dining")){
            if(!this.houseCoor.containsKey("dining")){
              this.houseCoor.put("dining", new ArrayList<Coordinates>());
            }
            this.houseCoor.get("dining").add(new Coordinates(livingRoomWidth,fixHeight));


          }
          else if(key.toLowerCase().contains("living")){
            if(!this.houseCoor.containsKey("living")){
              this.houseCoor.put("living", new ArrayList<Coordinates>());
            }
            this.houseCoor.get("living").add(new Coordinates(0,fixHeight));
          }
          else if(key.toLowerCase().contains("kitchen")){
            if(!this.houseCoor.containsKey("kitchen")){
              this.houseCoor.put("kitchen", new ArrayList<Coordinates>());
            }
            this.houseCoor.get("kitchen").add(new Coordinates(livingRoomWidth+diningRoomWidth,fixHeight));

          }
          else if(key.toLowerCase().contains("bathroom")){

          }
          else{

          }

          this.rooms.put(
              key,
              new Room(
                  room.getRoomNumber(),
                  key,
                  room.getNumWindows(),
                  room.getNumLights(),
                  room.getNumDoors(),6,6));
        });
  }

  /**
   * Getter for outside temperature
   *
   * @return double
   */
  public double getOutTemp() {
    return this.outTemp;
  }

  /**
   * Setter for outside temperature
   *
   * @param outTemp the outside temperature
   */
  public void setOutTemp(double outTemp) {
    this.outTemp = outTemp;
  }

  /**
   * Getter for rooms
   *
   * @return Hash map
   */
  public HashMap<String, Room> getRooms() {
    return this.rooms;
  }

  public HashMap<String, List<Coordinates>> getHouseCoor() {
    return houseCoor;
  }
}
