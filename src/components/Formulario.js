import React from 'react'

import './Formulario.scss'

class NameForm extends React.Component {
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
    if(validarCpf(''+this.state.value)){
      alert('TUDO CERTO: ' + this.state.value + " -- " + this.state.passwordValue + "--" + validarCpf(''+this.state.value));
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
        <div>
          <label>
            Senha:
            <input type="password" value={this.state.passwordValue} onChange={this.passwordHandleChange} />
          </label>
        </div>
        <input type="submit" value="Enviar" />
      </form>

    );
  }
}
export default NameForm;