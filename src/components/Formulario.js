import React from 'react'
import api from '../service/api'
import MyButton from './MyButton';
import { Link } from 'react-router-dom';




class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      cpfBASE64: '',
      blockButton: true
    };
    this.valueHandleChange = this.valueHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  valueHandleChange(event) {
    var Base64 = require('js-base64').Base64;
    var eventTargetValue = event.target.value
    this.setState({
      cpf: eventTargetValue,
      cpfBASE64: Base64.encode(eventTargetValue)
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
    api.post('login/'+this.state.cpf).then(function (response) {
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <form class="box" method="post" >
          <h1>CPF:</h1>
          <input type="text" value={this.state.value} onChange={this.valueHandleChange} />
          <Link to={"/pergunta" + this.state.cpfBASE64}>
            <MyButton onClick={this.handleSubmit} disabled={this.state.blockButton} label="Ok" />
          </Link>
        </form>
      </div>

    );
  }
}
export default NameForm;