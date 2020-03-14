import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ContaEdit extends Component {

  contaVazia = {
    nome: '',
    numeroConta: '',
    agencia: '',
    taxa: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.contaVazia
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {

    if (this.props.match.params.numeroConta !== 'criar'){
      const conta = await (await fetch(`/contas/${this.props.match.params.numeroConta}`)).json();
      this.setState({item: conta});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    item.id ? 
    await fetch(`/contas/${this.props.match.params.numeroConta}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    }) : 
    await fetch(`/contas`, {
      method: 'POST',
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
    const title = <h2>{item.id ? 'Alterar Conta' : 'Criar Conta'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" value={item.nome || ''}
                   onChange={this.handleChange} autoComplete="nome"/>
          </FormGroup>
          <FormGroup>
            <Label for="numeroConta">Número da conta</Label>
            <Input type="text" name="numeroConta" id="numeroConta" value={item.numeroConta || ''}
                   onChange={this.handleChange} autoComplete="000000"/>
          </FormGroup>
          <FormGroup>
            <Label for="agencia">Agência</Label>
            <Input type="text" name="agencia" id="agencia" value={item.agencia || ''}
                   onChange={this.handleChange} autoComplete="0000"/>
          </FormGroup>
            <FormGroup >
              <Label for="taxa">Taxa</Label>
              <Input type="text" name="taxa" id="taxa" value={item.taxa || ''}
                     onChange={this.handleChange} autoComplete="0,0"/>
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

export default withRouter(ContaEdit);