package team23.smartHomeSimulator.controller;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Profile;
import java.util.HashMap;


@RestController
@RequestMapping("/api")
public class ProfileController {
    private HashMap<String,Profile> allProfiles;

    public ProfileController(Profile profile) {
        this.allProfiles = new HashMap<>();
    }

    @PutMapping("/profile")
    public void createProfile(@RequestParam(name = "name")String name,@RequestParam(name = "location") String location,@RequestParam(name = "role")String role,@RequestParam(name = "permission")String permission ) {
        this.allProfiles.put(name,new Profile(name,location,role,permission));
    }

    @DeleteMapping("/profile")
    public void deleteProfile(@RequestParam(name = "name")String name){
        int counter = allProfiles.size();
        while(counter != 0){
            counter--;
            if (allProfiles.get(counter).getName() == name) {
                allProfiles.remove(counter);
                counter = 0;
            }
        }
    }
    @PostMapping("/profile")
    public void editProfile(@RequestParam(name = "oldName")String oldName, @RequestParam(name = "name")String name, @RequestParam(name = "location") String location,@RequestParam(name = "role")String role,@RequestParam(name = "permission")String permission){
        int counter = allProfiles.size();
        while(counter != 0){
            counter--;
            if (allProfiles.get(counter).getName() == oldName) {
                allProfiles.get(counter).setAll(name,location,role,permission,false);
                counter = 0;
            }
        }
    }
}
