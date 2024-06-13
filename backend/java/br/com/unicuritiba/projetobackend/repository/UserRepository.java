package br.com.unicuritiba.projetobackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.unicuritiba.projetobackend.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
}
