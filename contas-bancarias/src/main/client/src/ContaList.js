import React, { Component} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class ContaList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contas: [],
            isLoading: true,
            offset: 0,
            perPage: 10,
            pageCount: 0
        };
        this.remove = this.remove.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    getContas() {
        fetch('/contas')
        .then(response => response.json())
        .then(data => this.setState({contas: data, isLoading: false}));
    }

    componentDidMount() {
        this.getContas();        
    }

    async remove(numeroConta) {
        await fetch(`/contas/${numeroConta}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Conten-type': 'application/json'
            }
        }).then(() => {
            let updatedContas = [...this.state.contas].filter(i => i.numeroConta !== numeroConta);
            this.setState({contas: updatedContas});
        });
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = selected * this.state.perPage;

        this.setState({ currentPage: selected, offset: offset }, () => {
            this.getContas();
        });
      }

    setElementsForCurrentPage() {
      let elements = this.state.contas
                    .slice(this.state.offset, this.state.offset + this.state.perPage);
      this.setState({ contas: elements });
    }

    sort

    render() {
        const {contas, isLoading} = this.state;

        if (isLoading) {
            return <p>Carregando...</p>
        }

        const ContaList = contas.map(conta => {
            const numeroContaAgenciaNumero = `${conta.numeroConta} / ${conta.agencia}`;
            
            if (conta.chequeEspecial === 'R$ 0,00') {
                conta.chequeEspecialDiaSeguinte = 'R$ 0,00';
            }

            if (conta.chequeEspecialLiberado === 'Liberado') {
                return <tr key={conta.id}>
                <td style={{whiteSpace: 'nowrap'}}>{conta.nome}</td>
                <td>{numeroContaAgenciaNumero}</td>
                <td>{conta.saldo}</td>
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
                <td>{conta.saldo}</td>
                <td>{conta.chequeEspecialLiberado}</td> 
                <td>R$ 0,00</td>
                <td>R$ 0,00</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="success" tag={Link} to={"/contas/" + conta.numeroConta}>Alterar</Button>
                        <Button size="sm" color="warning" tag={Link} to={"/contas/"+ conta.numeroConta +"/cheque-especial"}>Ativar LIS</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(conta.numeroConta)}>Remover</Button>
                    </ButtonGroup>
                </td>
                </tr>
            }
        });

        return (
            <div>              
              <AppNavbar/>
              <Container fluid>
                <div className="float-right">
                  <Button color="success" tag={Link} to="/contas/criar">Criar Conta</Button>
                </div>
                <h3>Contas</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Conta/Agência</th>
                        <th>Saldo</th>
                        <th>Cheque Especial</th>
                        <th>Valor Cheque Especial</th>
                        <th>Cheque Especial Dia Seguinte</th>
                        <th>Operação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ContaList}
                    </tbody>
                    </Table>
              </Container>
            </div>
          );
    }
}

export default ContaList;