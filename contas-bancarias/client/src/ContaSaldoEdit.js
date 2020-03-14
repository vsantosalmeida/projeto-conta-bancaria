import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ContaSaldoEdit extends Component {

    saldoVazio = {
     valor: ''
    };

    constructor(props) {
        super(props);
        this.state = {
        item: this.saldoVazio
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        let item = {...this.state.item};
        item.valor = value;
        this.setState({item});
      }

      async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch(`/contas/${this.props.match.params.numeroConta}/saldo`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),

        });

        this.props.history.push('/');
      }

      render() {
        const {item} = this.state;
  
        return <div>
          <AppNavbar/>
          <Container>
            <h2>{'Alterar Saldo da Conta'}</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="valor">Valor</Label>
                <Input style={{ width:"300px" }} type="text" name="valor" id="valor" value={item.valor || ''}
                       onChange={this.handleChange} autoComplete="valor"/>
              </FormGroup>
                <FormGroup>
                <Button color="primary" type="submit">Salvar</Button>{' '}
                <Button color="secondary" tag={Link} to="/">Voltar</Button>
              </FormGroup>
            </Form>
          </Container>
        </div>
    }

}

export default withRouter(ContaSaldoEdit);