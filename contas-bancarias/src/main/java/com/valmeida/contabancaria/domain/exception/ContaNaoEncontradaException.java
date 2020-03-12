package com.valmeida.contabancaria.domain.exception;

public class ContaNaoEncontradaException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;

	public ContaNaoEncontradaException(int numeroConta) {
		super(String.format("Conta de número %d não encontrada.", numeroConta));
	}
	
}
