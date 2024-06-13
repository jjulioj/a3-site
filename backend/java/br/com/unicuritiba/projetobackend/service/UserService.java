package br.com.unicuritiba.projetobackend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.unicuritiba.projetobackend.repository.UserRepository;
import br.com.unicuritiba.projetobackend.model.UserEntity;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public Optional<UserEntity> findUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public List<UserEntity> findAllUser(){
    	return userRepository.findAll();
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    public Optional<UserEntity> updateUser(Long id, UserEntity user) {
        return userRepository.findById(id).map(existingUser -> {
            user.setId(id);
            return userRepository.save(user);
        });
    }
    
}
