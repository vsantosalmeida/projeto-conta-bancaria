package com.valmeida.contabancaria.domain.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Conta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String nome;
	
	private int numeroConta;
	
	private int agencia;
	
	private boolean chequeEspecialLiberado;
	
	private String saldo;
	
	private String chequeEspecial;
	
	private String taxa;
	
}