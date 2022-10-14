package com.pedromateus.dscatalog.model.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedromateus.dscatalog.controller.dto.StockDTO;
import com.pedromateus.dscatalog.model.entities.Category;
import com.pedromateus.dscatalog.model.entities.Stock;
import com.pedromateus.dscatalog.shared.exceptions.DataBaseException;
import com.pedromateus.dscatalog.shared.exceptions.ResourceNotFoundException;
import com.pedromateus.dscatalog.model.repositories.CategoryRepository;
import com.pedromateus.dscatalog.model.repositories.StockRepository;

@Service
public class StockService {

	@Autowired
	private StockRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public Page<StockDTO> findAllPaged(PageRequest pageRequest) {
		Page<Stock> page = repository.findAll(pageRequest);
		repository.find(page.toList());
		return page.map(x -> new StockDTO(x,x.getCategories()));
	}

	@Transactional(readOnly = true)
	public StockDTO findById(Long id) {
		Optional<Stock> obj = repository.findById(id);
		Stock entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entitiy not found"));
		return new StockDTO(entity, entity.getCategories());
	}

	@Transactional
	public StockDTO insert(StockDTO dto) {
		Stock entity = new Stock();
		copyDtoEntity(dto,entity);
		if(entity.getCategories().size()==0) {
			Category cat=categoryRepository.getOne(1L);
			entity.getCategories().add(cat);
		}
		entity = repository.save(entity);
		return new StockDTO(entity);
	}

	@Transactional
	public StockDTO update(Long id, StockDTO dto) {
		try {
			Stock entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new StockDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not foound" + id);
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}

	}
	
	private void copyDtoEntity(StockDTO dto, Stock entity) {
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		
		dto.getCategories().forEach(catDto->{
			Category category=categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(category)
;		});
		
	}
}
