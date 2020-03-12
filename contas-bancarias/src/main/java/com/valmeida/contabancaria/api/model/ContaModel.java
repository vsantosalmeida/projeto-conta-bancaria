package com.valmeida.contabancaria.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContaModel {
	
	private String nome;
	
	private String numeroContaAgencia;
	
	private String saldo;
	
	private String chequeEspecialLiberado;
}
