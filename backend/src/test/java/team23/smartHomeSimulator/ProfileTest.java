package team23.smartHomeSimulator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProfileTest {

  @Autowired private MockMvc mockMvc;

  @BeforeEach
  public void createProfile() throws Exception {
    MockHttpServletRequestBuilder builderGordon =
        MockMvcRequestBuilders.post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"name\":\"Gordon\",\"location\":\"Outside\",\"role\":\"Owner\",\"permission\":\"Parents\"}");

    MockHttpServletRequestBuilder builderDavid =
        MockMvcRequestBuilders.post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"name\":\"David\",\"location\":\"Kitchen\",\"role\":\"Owner\",\"permission\":\"Parents\"}");

    this.mockMvc.perform(builderGordon);
    this.mockMvc.perform(builderDavid);
  }

  @Test
  public void shouldReturnAllProfiles() throws Exception {
    this.mockMvc
        .perform(get("/api/profiles"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("Gordon")))
        .andExpect(content().string(containsString("David")));
  }

  @Test
  public void shouldReturnOneProfile() throws Exception {
    this.mockMvc
        .perform(get("/api/profiles/gordon"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("Gordon")));
  }

  @Test
  public void shouldDeleteOneProfile() throws Exception {
    this.mockMvc
        .perform(delete("/api/profiles").param("name", "gordon"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("Gordon")));

    this.mockMvc
        .perform(get("/api/profiles"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(not(containsString("Gordon"))))
        .andExpect(content().string(containsString("David")));
  }

  @Test
  public void shouldUpdateProfile() throws Exception {
    MockHttpServletRequestBuilder builderUpdate =
        MockMvcRequestBuilders.put("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"oldName\":\"gordon\",\"name\":\"newName\",\"location\":\"location\",\"role\":\"role\",\"permission\":\"permission\"}");

    this.mockMvc.perform(builderUpdate);

    this.mockMvc
        .perform(get("/api/profiles/gordon"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("")));

    this.mockMvc
        .perform(get("/api/profiles/newName"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("newName")));
  }

  @Test
  public void shouldLoginAndLogout() throws Exception {
    MockHttpServletRequestBuilder builderLogin =
        MockMvcRequestBuilders.put("/api/profiles/login")
            .param("name", "gordon")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8");

    this.mockMvc.perform(builderLogin);

    this.mockMvc
        .perform(get("/api/profiles/gordon"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("\"active\":true")));

    MockHttpServletRequestBuilder builderLogout =
        MockMvcRequestBuilders.put("/api/profiles/logout")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8");

    this.mockMvc.perform(builderLogout);

    this.mockMvc
        .perform(get("/api/profiles/gordon"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("\"active\":false")));
  }

  @Test
  public void shouldUpdateLocation() throws Exception {
    MockHttpServletRequestBuilder builderLocation =
        MockMvcRequestBuilders.put("/api/profiles/location")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"name\":\"gordon\",\"location\":\"garage\"}");

    this.mockMvc.perform(builderLocation);

    this.mockMvc
        .perform(get("/api/profiles/gordon"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("\"location\":\"garage\"")));
  }
}
