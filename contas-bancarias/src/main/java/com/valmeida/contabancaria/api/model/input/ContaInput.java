package com.valmeida.contabancaria.api.model.input;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContaInput {
	
	@NotBlank
	private String nome;
	
	@Positive
	@NotNull
	private int numeroConta;
	
	@Positive
	@NotNull
	private int agencia;
	
	@NotBlank
	private String taxa;
	
}
