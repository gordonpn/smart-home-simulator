package team23.smartHomeSimulator.model.modules;

import team23.smartHomeSimulator.model.House;

/** Abstract class for observer */
public abstract class modulesObserver {
  public abstract void update(House house);
}
