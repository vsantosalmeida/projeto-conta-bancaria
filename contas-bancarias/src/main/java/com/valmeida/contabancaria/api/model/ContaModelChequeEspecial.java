package com.valmeida.contabancaria.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContaModelChequeEspecial {
	
	private String nome;
	
	private String numeroContaAgencia;
	
	private String saldo;
	
	private String chequeEspecialLiberado;
	
	private String chequeEspecial;
	
	private String chequeEspecialDiaSeguinte;
}
