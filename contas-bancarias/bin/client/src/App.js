import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContaList from './ContaList';
import ContaEdit from './ContaEdit';
import ContaChequeEspecialEdit from './ContaChequeEspecialEdit';
import ContaPesquisa from './ContaPesquisa';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/contas/buscar' exact={true} component={ContaPesquisa}/>
          <Route path='/contas' exact={true} component={ContaList}/>
          <Route path='/contas/:numeroConta/cheque-especial' exact={true} component={ContaChequeEspecialEdit}/>
          <Route path='/contas/:numeroConta' component={ContaEdit}/>
        </Switch>
      </Router>
    )
  }
}
export default App;
