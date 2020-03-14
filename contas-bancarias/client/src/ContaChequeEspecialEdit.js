import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ContaChequeEspecialEdit extends Component {

    chequeEspecialVazio = {
     chequeEspecial: ''
    };

    constructor(props) {
        super(props);
        this.state = {
        item: this.chequeEspecialVazio
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        let item = {...this.state.item};
        item.chequeEspecial = value;
        this.setState({item});
      }

      async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch(`/contas/${this.props.match.params.numeroConta}/cheque-especial`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),

        });

        this.props.history.push('/contas');
      }

      render() {
        const {item} = this.state;
  
        return <div>
          <AppNavbar/>
          <Container>
            <h2>{'Ativar LIS'}</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="valor">Valor</Label>
                <Input type="text" name="valor" id="valor" value={item.chequeEspecial || ''}
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

export default withRouter(ContaChequeEspecialEdit);