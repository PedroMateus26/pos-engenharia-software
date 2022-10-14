package com.pedromateus.dscatalog.model.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pedromateus.dscatalog.model.entities.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long>{
	
	/*@Query("SELECT  DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE"
			+ "(COALESCE(:categories) IS NULL OR cats IN :categories) AND"
			+ "(LOWER (obj.name) LIKE LOWER(CONCAT ('%',:name,'%')))" )
	Page<Product> find(List<Category> categories, String name, Pageable pageable);*/
	
	@Query("SELECT obj FROM Stock obj JOIN FETCH obj.categories WHERE obj IN :stocks")
	List<Stock> find(List<Stock> stocks);
}
