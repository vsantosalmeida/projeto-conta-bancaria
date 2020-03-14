package com.valmeida.contabancaria.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContaModel {
	
	private long id;
	
	private String nome;
	
	private int numeroConta;
	
	private int Agencia;
	
	private String saldo;
	
	private String chequeEspecialLiberado;
	
	private String taxa;
}
