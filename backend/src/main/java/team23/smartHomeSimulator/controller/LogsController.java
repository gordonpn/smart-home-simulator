package team23.smartHomeSimulator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team23.smartHomeSimulator.model.Logs;
import team23.smartHomeSimulator.model.request_body.LogItem;
import team23.smartHomeSimulator.utility.SaveOutput;

/** Controller for logs */
@RestController
@RequestMapping("/api")
public class LogsController {
  private Logs logs;

  /** Default constructor */
  public LogsController() {
    this.logs = new Logs();
  }

  /**
   * Saves current logs in memory on the filesystem
   *
   * @return HTTP response. 500 when exception is caught, otherwise 200
   */
  @PostMapping("/logs/save")
  public ResponseEntity<Object> saveToFile(@RequestBody LogItem requestBody) {
    logs.add(
        new LogItem(requestBody.getTimestamp(), requestBody.getMessage(), requestBody.getModule()));
    return SaveOutput.saveToFile("logs.json", logs.getLogs());
  }
}
