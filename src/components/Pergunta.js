import React from 'react'
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
        this.state = { 
            cpf: this.props.match.params.cpf,
            addressSintoma: 0,
            arrayNomeSintoma: [], 
            arrayIdSintoma: [], 
            text:'', 
            level: -1, 
            disabledButton: true, 
            imagem: 'https://i.pinimg.com/736x/5f/3d/f9/5f3df9a20c35308eb27a153248628c2a.jpg'
        };
        this.setlevel = this.setlevel.bind(this);
        this.setCorrentIdNameSintoma = this.setCorrentIdNameSintoma.bind(this);
        this.setArraySintomas();
    }

    setlevel(event) {
        if(this.state.addressSintoma <= this.state.arrayIdSintoma.length){
            this.setState({
                level: parseInt(event.target.getAttribute('id')),
                disabledButton: false
            });
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
        api.post()
        if(this.state.addressSintoma < this.state.arrayIdSintoma.length){

            this.setState({
                addressSintoma: this.state.addressSintoma + 1,
                text: 'Qual é seu level de '+this.state.arrayNomeSintoma[this.state.addressSintoma]+"?",
                disabledButton: true
            })
        }
        else{
            this.setState({
                addressSintoma: this.state.addressSintoma + 1,
                text: 'acabou',
                disabledButton: true,
                imagem: 'https://pm1.narvii.com/6704/6e0f2fa15572d5e4af3ce47024acb7cf384a6a56_hq.jpg'
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1> {this.state.text}</h1>
                    <h1>TESTE : {this.state.cpf}</h1>
                    <img src={this.state.imagem} alt='Pessoa Doente' />
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

//
//eviar post do sintoma
export default Pergunta