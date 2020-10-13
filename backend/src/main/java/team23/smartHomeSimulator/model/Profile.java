package team23.smartHomeSimulator.model;

public class Profile {

    private String name;
    private String location;
    private String role;
    private String permission;
    private boolean isActive;

    public Profile(String Name,String Location,String Role, String Permission,boolean IsActive){

        this.name = Name;
        this.location = Location;
        this.role = Role;
        this.permission = Permission;
        this.isActive = IsActive;
    }
    public Profile(String Name){
        this.name = Name;
        this.location = "Outside";
        this.permission = "Guest";
        this.permission = "none";
        this.isActive = false;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getRole() {
        return role;
    }

    public String getPermission() {
        return permission;
    }

    public boolean getActive() {
        return isActive;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
    
}
