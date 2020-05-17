import React from 'react'
import imagemDoente from '../imagem/doente.jpg'
import api from '../service/api'
import MyButton from './MyButton';

class Pergunta extends React.Component {
    /*
    addresSintoma: define qual index pegar no 'arrayNomeSintoma' e 'arrayIdSintoma'
    arrayNomeSintoma: armazena os sintomas retornados pela API
    arrayIdSintoma: armazena os id retornados pela API
    text: texto para ser usado nas perguntas
    level: nivel de dor para enviar para API
    disabledButton: se o botão de proximo vai ser clicavel ou não
    */ 
    constructor(props) {
        super(props);
        this.state = { addressSintoma: 0, arrayNomeSintoma: [], arrayIdSintoma: [], text:'', level: -1, disabledButton: true };
        this.setlevel = this.setlevel.bind(this);
        this.setCorrentIdNameSintoma = this.setCorrentIdNameSintoma.bind(this);
        this.setArraySintomas();
    }

    setlevel(event) {
        var numero = parseInt(event.target.getAttribute('id'))
        if(this.state.addressSintoma < this.state.arrayIdSintoma.length){
            this.setState({
                level: numero,
                disabledButton: false
            });
        }
        else{
            //titulo padrão
            //imagem padrão
        }
    }

    setArraySintomas() {
        api.get('/sintomas').then((res) => (
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
        var newaddress = this.state.addressSintoma + 1
        this.setState({
            addressSintoma: newaddress,
            text: 'Qual é seu level de '+this.state.arrayNomeSintoma[this.state.addressSintoma]+"?",
            disabledButton: true
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h1> {this.state.text}</h1>
                    <img src={imagemDoente} alt='Pessoa Doente' />
                    <MyButton disabled={this.state.disabledButton} onClick={this.setCorrentIdNameSintoma} label="clique" />
                </div>
                <div>
                    <MyButton id="0" onClick={this.setlevel} label="0" />
                    <MyButton id="1" onClick={this.setlevel} label="1" />
                    <MyButton id="2" onClick={this.setlevel} label="2" />
                    <MyButton id="3" onClick={this.setlevel} label="3" />
                    <MyButton id="4" onClick={this.setlevel} label="4" />
                    <MyButton id="5" onClick={this.setlevel} label="5" />
                </div>
            </div>
        )
    }
}

//criar banco de imagens e alterar junto com o titulo
//eviar post do sintoma
export default Pergunta