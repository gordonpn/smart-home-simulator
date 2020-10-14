package team23.smartHomeSimulator.controller;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Profile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api")
public class ProfileController {
    private HashMap<String,Profile> allProfiles;

    public ProfileController(/**Profile profile**/) {
        this.allProfiles = new HashMap<>();
    }

    @GetMapping ("/profile")
    public List<Profile> getAllProfiles() {
        List<Profile>profiles = (List) allProfiles.values();
        return profiles;
    }
    @PutMapping("/profile")
    public void createProfile(@RequestParam(name = "name")String name,@RequestParam(name = "location") String location,@RequestParam(name = "role")String role,@RequestParam(name = "permission")String permission ) {
        allProfiles.put(name,new Profile(name,location,role,permission));
    }

    @DeleteMapping("/profile")
    public void deleteProfile(@RequestParam(name = "name")String name){
        allProfiles.remove(name);
    }
    @PostMapping("/profile")
    public void editProfile(@RequestParam(name = "oldName")String oldName, @RequestParam(name = "name")String name, @RequestParam(name = "location") String location,@RequestParam(name = "role")String role,@RequestParam(name = "permission")String permission){
        allProfiles.get(oldName).setAll(name,location,role,permission,false);
    }
}
