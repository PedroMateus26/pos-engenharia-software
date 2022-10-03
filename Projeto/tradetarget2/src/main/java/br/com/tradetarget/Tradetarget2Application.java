package br.com.tradetarget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
@EnableAutoConfiguration(exclude = ErrorMvcAutoConfiguration.class) // Needed by Zalando Problem lib
public class Tradetarget2Application {

	public static void main(String[] args) {
		SpringApplication.run(Tradetarget2Application.class, args);
	}

}
