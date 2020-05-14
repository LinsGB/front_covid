import React from 'react'
import api from '../service/api'

import '../components/Formulario.scss'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', passwordValue: '' };
    this.passwordHandleChange = this.passwordHandleChange.bind(this);
    this.valueHandleChange = this.valueHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  passwordHandleChange(event) {
    this.setState({
      passwordValue: event.target.value
    });
  }
  valueHandleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    var validarCpf = require("validar-cpf")
    let cpf = this.state.value
    if(cpf){
      api.post(`login/${cpf}`).then((res) => (
        console.log(res.data)
      ))
    }
    else{
      alert('CPF INVALIDO');
      this.setState({
        passwordValue: '',
        value: ''
      });

    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            CPF:
            <input type="text" value={this.state.value} onChange={this.valueHandleChange} />
          </label>
        </div>
        <input type="submit" value="Enviar" />
      </form>

    );
  }
}
export default Login;