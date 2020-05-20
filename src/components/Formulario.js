import React from 'react'
import api from '../service/api'
import MyButton from './MyButton';
import { Link } from 'react-router-dom';




class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      blockButton: true
    };
    this.valueHandleChange = this.valueHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  valueHandleChange(event) {
    this.setState({
      cpf: event.target.value
    },
      () => {
        var validarCpf = require("validar-cpf")
        let cpf = this.state.cpf
        if (validarCpf(cpf)) {
          this.setState({
            blockButton: false
          });
        }
      });
  }

  handleSubmit(event) {
    var validarCpf = require("validar-cpf")
    let cpf = this.state.cpf
    if (validarCpf(cpf)) {
      api.post(`login/${cpf}`)
    }
    else {
      alert('CPF INVALIDO');


    }
    event.preventDefault();
  }

  render() {
    return (
        <div>
        <form class="box" method="post" onSubmit={this.handleSubmit}>
        <h1>CPF:</h1>
        <input type="text" value={this.state.value} onChange={this.valueHandleChange} />
        {
          this.state.blockButton
            ? <Link to={"/pergunta" + this.state.cpf}>
              <MyButton disabled={this.state.blockButton} label="test2" />
            </Link>
            : <Link to={"/pergunta" + this.state.cpf}>
              <MyButton disabled={this.state.blockButton} label="test" />
            </Link>
        }
        </form> 
      </div>

    );
  }
}
export default NameForm;