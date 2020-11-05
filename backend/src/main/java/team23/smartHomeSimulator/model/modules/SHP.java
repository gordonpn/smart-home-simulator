package team23.smartHomeSimulator.model.modules;

import team23.smartHomeSimulator.model.House;

import java.util.HashMap;
import java.util.Map;

public class SHP extends modulesObserver {

    private boolean awayModeOn;
    private String moduleName;
//    private House house;

    public SHP(){
//        this.house = house;
//        this.house.addModuleObserver(this);
        this.moduleName= "SHP";
        this.awayModeOn =false;

    }

    public String getModuleName() {
        return moduleName;
    }

    public boolean getIsAwayModeOn() {
        return awayModeOn;
    }

    public void setAwayModeOn(boolean awayModeOn) {
        this.awayModeOn = awayModeOn;
    }

    public void update(House house){
        HashMap<String, String> userLocation =house.getUsersLocation();
        this.setAwayModeOn(true);
        for(Map.Entry<String,String> entry: userLocation.entrySet()){
            String value = entry.getValue();

            if(!value.equalsIgnoreCase("outside")){
                this.setAwayModeOn(false);
                break;
            }
        }

        if(this.getIsAwayModeOn()){
            //send command to SHC
        }

    }
}
