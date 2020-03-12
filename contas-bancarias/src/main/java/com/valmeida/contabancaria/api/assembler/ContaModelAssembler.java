package com.valmeida.contabancaria.api.assembler;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.valmeida.contabancaria.api.model.ContaModel;
import com.valmeida.contabancaria.api.model.ContaModelChequeEspecial;
import com.valmeida.contabancaria.domain.model.Conta;

@Component
public class ContaModelAssembler {
	
	private final DecimalFormat df = new DecimalFormat("R$ ###,##0.00");
	
	public ContaModel toContaModel(Conta conta) {
		
		ContaModel contaModel = new ContaModel();
		
		contaModel.setNome(conta.getNome());
		contaModel.setNumeroContaAgencia(conta.getNumeroConta() + " / " + conta.getAgencia());
		contaModel.setChequeEspecialLiberado("Não liberado");
		contaModel.setSaldo(valueFormat(conta.getSaldo()));
		
		return contaModel;
		
	}
	
	public ContaModelChequeEspecial toContaModelChequeEspecial(Conta conta) {
		
		ContaModelChequeEspecial contaModel = new ContaModelChequeEspecial();
		
		contaModel.setNome(conta.getNome());
		contaModel.setNumeroContaAgencia(conta.getNumeroConta() + " / " + conta.getAgencia());
		contaModel.setChequeEspecialLiberado("Liberado");
		contaModel.setSaldo(valueFormat(conta.getSaldo()));
		contaModel.setChequeEspecial(valueFormat(conta.getChequeEspecial()));
		
		if(!conta.getChequeEspecial().equals("0")) {
			
			BigDecimal jurosChequeEspecial = new BigDecimal(valueParse(conta.getChequeEspecial()))
												.multiply(new BigDecimal(valueParse(conta.getTaxa())))
												.divide(new BigDecimal("100"));
			
			BigDecimal chequeEspecialDiaSeguinte = new BigDecimal(valueParse(conta.getChequeEspecial())).add(jurosChequeEspecial);
			
			chequeEspecialDiaSeguinte = chequeEspecialDiaSeguinte.setScale(2, BigDecimal.ROUND_HALF_EVEN);
			
			contaModel.setChequeEspecialDiaSeguinte(df.format(chequeEspecialDiaSeguinte));
		}
		
		
		return contaModel;
	}
	
	
	public List<?> toCollection(List<Conta> contas){
		return contas.stream()
					.map(conta -> conta.isChequeEspecialLiberado() ? toContaModelChequeEspecial(conta) : toContaModel(conta))
					.collect(Collectors.toList());
	}
	
	private String valueParse(String value) {
		value = value.replace(".", "");
		value = value.replace(",", ".");
		
		return value;
	}
	
	private String valueFormat(String value) {
		BigDecimal bd = new BigDecimal(valueParse(value));
		
		return df.format(bd);
	}
}
