package com.pedromateus.dscatalog.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedromateus.dscatalog.model.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
