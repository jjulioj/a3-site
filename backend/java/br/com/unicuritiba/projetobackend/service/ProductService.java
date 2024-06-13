package br.com.unicuritiba.projetobackend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.unicuritiba.projetobackend.repository.ProductRepository;
import br.com.unicuritiba.projetobackend.model.ProductEntity;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductEntity saveProduct(ProductEntity product) {
        return productRepository.save(product);
    }

    public Optional<ProductEntity> findProductById(Long id) {
        return productRepository.findById(id);
    }
    
    public List<ProductEntity> findAllProduct(){
    	return productRepository.findAll();
    }
    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    public Optional<ProductEntity> updateProduct(Long id, ProductEntity product) {
        return productRepository.findById(id).map(existingProduct -> {
            product.setId(id);
            return productRepository.save(product);
        });
    }
    
}
