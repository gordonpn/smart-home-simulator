package team23.smartHomeSimulator.model;

/**
 * The Light class is a component of a room
 */
public class Light {

    /**
     * The state of the light (Is the light on?)
     */
    private boolean isOn;

    /**
     * Default constructor
     */
    public Light() {
        this.isOn = false;
    }

    /**
     * Getter for checking if the light is on
     * @return boolean
     */
    public boolean getIsOn() {
        return this.isOn;
    }

    /**
     * Setter for changing the light status
     * @param on the new state of the light
     */
    public void setIsOn(boolean on) {
        this.isOn = on;
    }
}
