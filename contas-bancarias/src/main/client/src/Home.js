import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <ButtonGroup>
            <Button color="link"><Link to="/contas">GERENCIAR TODAS AS CONTAS</Link></Button>
            <Button color="link"><Link to="/contas/buscar">PESQUISAR UMA CONTA</Link></Button>
          </ButtonGroup>
        </Container>
      </div>
    );
  }
}

export default Home;