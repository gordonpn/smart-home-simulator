package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class DateTimeTest {

  @Autowired private MockMvc mockMvc;

  @Test
  public void shouldReturnWithKey() throws Exception {
    this.mockMvc
        .perform(get("/api/date-time"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("currentTime")));
  }

  @Test
  public void shouldReturnValueSent() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.put("/api/date-time")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"currentTime\": \"2020-10-15\"}");

    this.mockMvc
        .perform(builder)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("2020-10-15")));
  }
}
