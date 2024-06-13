package br.com.unicuritiba.projetobackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.unicuritiba.projetobackend.model.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    
}
