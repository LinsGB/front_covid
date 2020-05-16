import React from 'react'
import api from '../service/api'




class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cpf: ''};
    this.valueHandleChange = this.valueHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  valueHandleChange(event) {
    this.setState({
      cpf: event.target.value
    });
  }

  handleSubmit(event) {
    var validarCpf = require("validar-cpf")
    let cpf = this.state.cpf
    if(validarCpf(cpf)){
      api.post(`login/${cpf}`).then((res) => (
        console.log(res.data)
      ))
    }
    else{
      alert('CPF INVALIDO');
      this.setState({
        cpf: ''
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
export default NameForm;