package team23.smartHomeSimulator;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SmartHomeSimulatorApplicationTests {

  @Test
  void contextLoads() {}

  @Autowired private MockMvc mockMvc;
  private JSONObject jsonString;

  @Test
  public void testUploadHouseLayout() throws Exception {
    //		this.mockMvc.perform(post("/uploadHouse")
    //				.contentType(MediaType.APPLICATION_JSON)
    //				.content()
    //				.andExpect(status().isOk())
    //		);
  }
}
