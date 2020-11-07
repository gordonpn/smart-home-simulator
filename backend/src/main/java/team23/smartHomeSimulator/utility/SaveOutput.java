package team23.smartHomeSimulator.utility;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

/** Utility class to save to filesystem */
public final class SaveOutput {
  /** private constructor for utility classes */
  private SaveOutput() {}

  /**
   * save to the filesystem
   *
   * @param fileName file name to save as
   * @param data generic object to save
   * @return HTTP response. 500 when exception is caught, otherwise 200
   */
  public static ResponseEntity<Object> saveToFile(String fileName, Object data) {
    HashMap<String, String> response = new HashMap<>();
    try {
      new ObjectMapper().writeValue(new File(fileName), data);
    } catch (IOException e) {
      response.put("message", String.format("An error has occurred while saving %s", fileName));
      response.put("error", e.toString());
      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    response.put("message", String.format("Saved as %s", fileName));
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
