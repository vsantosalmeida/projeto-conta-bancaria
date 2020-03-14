import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, Table, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ContaPesquisa extends Component {

    contaNumero = {
        numero: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            conta: [], 
            item: this.contaNumero
        };
        this.remove = this.remove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.contaRender = this.contaRender.bind(this);
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        let item = {...this.state.item};
        item.numero = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const contaNumero = this.state.item;

        await fetch(`/contas/${contaNumero.numero}`)
                .then(response => response.json())
                .then(data => this.setState({conta: data}));
    } 
    
    async handleClick() {
        return this.sleep(500).then(() => { this.contaRender()});
    }
    

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };


    async remove(numeroConta) {
        await fetch(`/contas/${numeroConta}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Conten-type': 'application/json'
            }
        });

        this.props.history.push('/');
    }


    contaRender() {
        
        const conta = this.state.conta;

        if (conta.id) { 
    
            const toContaRender = () => {

                const numeroContaAgenciaNumero = `${conta.numeroConta} / ${conta.agencia}`;

                if (conta.chequeEspecial === 'R$ 0,00') {
                    conta.chequeEspecialDiaSeguinte = 'R$ 0,00';
                }
                if (conta.chequeEspecialLiberado === 'Liberado') {
                    return <tr key={conta.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{conta.nome}</td>
                    <td>{numeroContaAgenciaNumero}</td>
                    <td width="15%">{conta.saldo}</td>
                    <td>{conta.chequeEspecialLiberado}</td>
                    <td>{conta.chequeEspecial}</td>
                    <td>{conta.chequeEspecialDiaSeguinte}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="success" tag={Link} to={"/contas/" + conta.numeroConta}>Alterar</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(conta.numeroConta)}>Remover</Button>
                        </ButtonGroup>
                    </td>
                    </tr>
                } else {
                    return <tr key={conta.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{conta.nome}</td>
                    <td>{numeroContaAgenciaNumero}</td>
                    <td width="15%">{conta.saldo}</td>
                    <td>{conta.chequeEspecialLiberado}</td>
                    <td>R$ 0,00</td>
                    <td>R$ 0,00</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="success" tag={Link} to={"/contas/" + conta.numeroConta}>Alterar</Button>
                            <Button size="sm" color="info" tag={Link} to={"/contas/" + conta.numeroConta + "/saldo"}>Alterar Saldo</Button>
                            <br></br>
                            <Button size="sm" color="warning" tag={Link} to={"/contas/"+ conta.numeroConta + "/cheque-especial"}>Ativar LIS</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(conta.numeroConta)}>Remover</Button>
                        </ButtonGroup>
                    </td>
                    </tr>
                }
            };

             return (
                <div>
                    <Table className="mt-4">
                      <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Conta/Agência</th>
                        <th width="10%">Saldo</th>
                        <th>Cheque Especial</th>
                        <th>Valor Cheque Especial</th>
                        <th>Cheque Especial Dia Seguinte</th>
                        <th>Operação</th>
                      </tr>
                      </thead>
                      <tbody>
                      {toContaRender()}
                      </tbody>
                    </Table>
                </div>
             )
        }
         
        return null;
    }

    render() {
        
        const {item} = this.state;

        return <div>
        <AppNavbar/>
        <Container>
          <h2>Pesquisar Conta</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="contaNumero">Número da conta</Label>
              <Input style={{ width:"300px" }} type="text" name="contaNumero" id="contaNumero" value={item.numero || ''}
                     onChange={this.handleChange} autoComplete="contaNumeror"/>
            </FormGroup>
              <FormGroup>
              <Button onClick={this.handleClick} color="primary" type="submit">Pesquisar</Button>{' '}
              <Button color="secondary" tag={Link} to="/">Voltar</Button>
            </FormGroup>
          </Form>
            {this.contaRender()}
        </Container>
      </div>

    }

}

export default withRouter(ContaPesquisa);