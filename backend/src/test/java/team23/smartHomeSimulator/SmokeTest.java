package team23.smartHomeSimulator;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import team23.smartHomeSimulator.controller.DashboardController;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class SmokeTest {

  @Autowired
  private DashboardController dashboardController;

  @Test
  public void contextLoads() throws Exception {
    assertThat(dashboardController).isNotNull();
  }
}
