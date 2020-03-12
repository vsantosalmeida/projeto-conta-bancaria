package com.valmeida.contabancaria.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.valmeida.contabancaria.api.model.input.ContaAtualizaSaldoInput;
import com.valmeida.contabancaria.api.model.input.ContaChequeEspecialInput;
import com.valmeida.contabancaria.domain.exception.ContaNaoEncontradaException;
import com.valmeida.contabancaria.domain.model.Conta;
import com.valmeida.contabancaria.domain.repository.ContaRepository;

@Service
public class ContaService {
	
	@Autowired
	private ContaRepository repository;
	
	public Conta buscarConta(int numeroConta) {
		
		return repository.findByNumeroConta(numeroConta)
						.orElseThrow(() -> new ContaNaoEncontradaException(numeroConta));
	}
	
	@Transactional
	public Conta salvarConta(Conta conta) {
		return repository.save(conta);
	}
	
	@Transactional
	public void atualizarSaldo(int numeroConta, ContaAtualizaSaldoInput contaAtualizaSaldo) {
		
		Conta conta = buscarConta(numeroConta);
		conta.setSaldo(contaAtualizaSaldo.getValor());
	}
	
	
	@Transactional
	public void liberaChequeEspecial(int numeroConta, ContaChequeEspecialInput contaChequeEspecial) {
		Conta conta = buscarConta(numeroConta);
		conta.setChequeEspecialLiberado(true);
		conta.setChequeEspecial(contaChequeEspecial.getChequeEspecial());
	}
	
	@Transactional
	public void removerConta(int numeroConta) {
		Conta conta = buscarConta(numeroConta);
		repository.deleteById(conta.getId());
	}
}
