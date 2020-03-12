package com.valmeida.contabancaria.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.valmeida.contabancaria.domain.model.Conta;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long>{
	
	public Optional<Conta> findByNumeroConta(int numeroConta);
}
