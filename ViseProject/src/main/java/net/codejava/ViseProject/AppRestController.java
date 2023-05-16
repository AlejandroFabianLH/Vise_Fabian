package net.codejava.ViseProject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/v1/")
@CrossOrigin("*")
public class AppRestController {
    
    @Autowired
    private ProductServiceAPI productServiceAPI;

    @GetMapping(value = "/all")
	public List<Product> getAll() {
		return productServiceAPI.getAll();
	}

    @GetMapping(value = "/find/{id}")
	public Product find(@PathVariable Long id) {
		return productServiceAPI.get(id);
	}

	@PostMapping(value = "/save")
	public ResponseEntity<Product> save(@RequestBody @Valid Product product) {
		Product obj = productServiceAPI.save(product);
		return new ResponseEntity<Product>(obj, HttpStatus.OK);
	}

	@GetMapping(value = "/delete/{id}")
	public ResponseEntity<Product> delete(@PathVariable Long id) {
		Product product = productServiceAPI.get(id);
		if (product != null) {
			productServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}
}
