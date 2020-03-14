package com.valmeida.contabancaria.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.valmeida.contabancaria.api.assembler.ContaInputDisassembler;
import com.valmeida.contabancaria.api.assembler.ContaModelAssembler;
import com.valmeida.contabancaria.api.model.ContaModel;
import com.valmeida.contabancaria.api.model.input.ContaAtualizaSaldoInput;
import com.valmeida.contabancaria.api.model.input.ContaChequeEspecialInput;
import com.valmeida.contabancaria.api.model.input.ContaInput;
import com.valmeida.contabancaria.domain.exception.ContaNaoEncontradaException;
import com.valmeida.contabancaria.domain.model.Conta;
import com.valmeida.contabancaria.domain.repository.ContaRepository;
import com.valmeida.contabancaria.domain.service.ContaService;

@RestController
@RequestMapping("/contas")
public class ContaController {
	
	@Autowired
	ContaRepository repository;
	
	@Autowired
	ContaService service;
	
	@Autowired
	ContaModelAssembler contaAssembler;
	
	@Autowired
	ContaInputDisassembler contaDisassembler;
	
	@GetMapping
	public List<?> listarContas() {
		return contaAssembler.toCollection(repository.findAll());
	}
	
	@GetMapping("/{numeroConta}")
	public ResponseEntity<?> buscarConta(@PathVariable int numeroConta) {
		try {
			Conta conta = service.buscarConta(numeroConta);
			
			if(conta.isChequeEspecialLiberado()) {
				return ResponseEntity.ok(contaAssembler.toContaModelChequeEspecial(conta));
			}
			
			return ResponseEntity.ok(contaAssembler.toContaModel(conta));
			
		} catch (ContaNaoEncontradaException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public ContaModel criarConta(@RequestBody @Valid ContaInput contaInput) {
		Conta conta = service.salvarConta(contaDisassembler.toDomainModel(contaInput));
	
		return contaAssembler.toContaModel(conta);	
	}
	
	@PutMapping("/{numeroConta}")
	public ResponseEntity<?> alterarConta(@PathVariable int numeroConta, @RequestBody ContaInput contaInput) {
		try {
			Conta contaAtual = service.buscarConta(numeroConta);
			contaDisassembler.copyProperties(contaInput, contaAtual);
			return ResponseEntity.ok(service.salvarConta(contaAtual));
		} catch (ContaNaoEncontradaException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@PutMapping("/{numeroConta}/saldo")
	public ResponseEntity<?> atualizarSaldo(@PathVariable int numeroConta, @RequestBody ContaAtualizaSaldoInput conta) {
		try {
			service.atualizarSaldo(numeroConta, conta);
			return ResponseEntity.noContent().build();
		} catch (ContaNaoEncontradaException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
		}
	}
	
	@PutMapping("/{numeroConta}/cheque-especial")
	public ResponseEntity<?> liberaChequeEspecial(@PathVariable int numeroConta, @RequestBody ContaChequeEspecialInput conta) {
		try {
			service.liberaChequeEspecial(numeroConta, conta);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (ContaNaoEncontradaException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
		}
	}
	
	@DeleteMapping("/{numeroConta}")
	public ResponseEntity<?> removerConta(@PathVariable int numeroConta) {
		try {
			service.removerConta(numeroConta);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (ContaNaoEncontradaException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
}
