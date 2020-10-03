package team23.smartHomeSimulator.model;

import java.time.LocalDateTime;

public class Dashboard {
    private LocalDateTime dateTime;

    public Dashboard() {
        this.dateTime = LocalDateTime.now();
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
