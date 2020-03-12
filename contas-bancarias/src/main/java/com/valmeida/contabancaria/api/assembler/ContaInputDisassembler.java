package com.valmeida.contabancaria.api.assembler;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.valmeida.contabancaria.api.model.input.ContaInput;
import com.valmeida.contabancaria.domain.model.Conta;

@Component
public class ContaInputDisassembler {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Conta toDomainModel(ContaInput contaInput) {
		Conta conta = modelMapper.map(contaInput, Conta.class);
		
		conta.setChequeEspecialLiberado(false);
		conta.setSaldo("0");
		conta.setChequeEspecial("0");
		
		return conta;
	}
	
}
