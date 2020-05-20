import React from 'react'
import Header from './Header';
import './Grafico.css'

class Graficos extends React.Component {
    constructor(props){
        super(props)
        var Base64 = require('js-base64').Base64;
        this.state = {
            cpfBASE64: this.props.match.params.cpf,
            cpf: Base64.decode(this.props.match.params.cpf)
        }
    }
    render() {
        return (
            <div className="main-content">
                <Header cpf={this.state.cpfBASE64} />
                <div>
                    <iframe
                        src={"http://pussy-dev-dolls.herokuapp.com/public/dashboard/779d984c-1f82-4265-bf8d-b6852e931ba6" + "?cpf=" + this.state.cpf}
                        frameborder="0"
                        width="800"
                        height="600"
                        allowtransparency
                    ></iframe>
                </div>
            </div>
        )
    }
}

export default Graficos;