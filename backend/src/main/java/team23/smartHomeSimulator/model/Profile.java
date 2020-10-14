package team23.smartHomeSimulator.model;
//import org.springframework.stereotype.Component;

/**
 * This class is made for instantiating various profile within the smart home
 * dashboard and handle operations related to dashboard functionalities
 */
//@Component
public class Profile {

    /**
     * The name of the profile
     */
    private String name;

    /**
     * The Location of the Profile in the house
     */
    private String location;

    /**
     * The role of the Profile in the House
     */
    private String role;

    /**
     * Permission level that he profile has access
     */
    private String permission;

    /**
     * Current Status of the Profile, is it he current connected one or not
     */
    private boolean isActive;

    /**
     * Parametrised Constructor
     * @param name name of the profile
     * @param role role attributed to the profile
     * @param permission permission level profile has
     */
    public Profile(String name,String location,String role, String permission){

        this.name = name;
        this.location = location;
        this.role = role;
        this.permission = permission;
        this.isActive = false;
    }

    /**
     * Base Profile Constructor Initialising a Profile with only a name
     * @param name name of the base profile
     */
    public Profile(String name){
        this.name = name;
        this.location = "Outside";
        this.role = "Guest";
        this.permission = "none";
        this.isActive = false;
    }

    /**
     *
     * @return returns the name of the profile
     */
    public String getName() {
        return name;
    }

    /**
     *
     * @return returns the location of the profile
     */
    public String getLocation() {
        return location;
    }

    /**
     *
     * @return the role of the profile
     */
    public String getRole() {
        return role;
    }

    /**
     *
     * @return the permission level of the profile
     */
    public String getPermission() {
        return permission;
    }

    /**
     *
     * @return the state of the profile
     */
    public boolean getActive() {
        return isActive;
    }

    /**
     * sets the name of the profile
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * sets the location of the profile
     * @param location
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * sets the role of the profile
     * @param role
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * sets the permission level of the profile
     * @param permission
     */
    public void setPermission(String permission) {
        this.permission = permission;
    }

    /**
     * sets the state of the profile in relation to the dashboard
     * @param active
     */
    public void setActive(boolean active) {
        isActive = active;
    }

    public void setAll (String name,String location,String role, String permission,boolean isActive){
        this.name = name;
        this.location = location;
        this.role = role;
        this.permission = permission;
        this.isActive = isActive;
    }

}
