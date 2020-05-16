import React from 'react'
import imagemDoente from '../imagem/doente.jpg'
import api from '../service/api'


class NivelQuestionario extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nivel: -1, block: true };
        this.nivelHandleChange = this.nivelHandleChange.bind(this);
    }

    nivelHandleChange(event){
        this.setState({
            block: false
        })
        var numero = parseInt(event.target.getAttribute('id'))
        this.setState({
            nivel : numero
        });
    }

    render() {
        return (
            <div class="btn-group">
                <MyButton id="0" onClick = {this.nivelHandleChange} label="0"/>
                <MyButton id="1" onClick = {this.nivelHandleChange} label="1"/>
                <MyButton id="2" onClick = {this.nivelHandleChange} label="2"/>
                <MyButton id="3" onClick = {this.nivelHandleChange} label="3"/>
                <MyButton id="4" onClick = {this.nivelHandleChange} label="4"/>
                <MyButton id="5" onClick = {this.nivelHandleChange} label="5"/>
                {this.state.nivel}
            </div>
        )
    }
}

class MyButton extends React.Component {
    render() {
    return <button id={this.props.id} disabled={this.props.disabled} onClick = {this.props.onClick}>{this.props.label}</button>                
    }
}

class Pergunta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {adressSintoma: -1, arrayNomeSintoma: [], arrayIdSintoma: [] };
        this.setCorrentIdNameSintoma = this.setCorrentIdNameSintoma.bind(this);
        this.setArraySintomas();
    }

    setArraySintomas() {
        api.get('/sintomas').then((res) => (
            console.log(res.data),
            res.data.map((value) =>
                this.setState({
                    arrayNomeSintoma: this.state.arrayNomeSintoma.concat(value.nome),
                    arrayIdSintoma: this.state.arrayIdSintoma.concat(value.id)
                })
            ),
            this.setCorrentIdNameSintoma()
        ))
        console.log(this.state)
    }

    setCorrentIdNameSintoma(event) {
        var newAdress = this.state.adressSintoma + 1
        this.setState({
            adressSintoma: newAdress
        })
    }

    

    render() {
        return (
            <div>
                <h1>Qual é seu nivel de {this.state.arrayNomeSintoma[this.state.adressSintoma]}?</h1>
                <img src={imagemDoente} alt='Pessoa Doente' />
                <MyButton disabled={NivelQuestionario.state.block} onClick={this.setCorrentIdNameSintoma} label="clique"/>
                <NivelQuestionario/>
            </div>
        )
    }
}

//blokar butão para só funcionar quando o formulario estiver marcado
//criar banco de imagens e alterar junto com o titulo
export default Pergunta