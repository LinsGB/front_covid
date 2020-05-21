import React from 'react'
import api from '../service/api'
import MyButton from './MyButton';
import Header from './Header';
import './pergunta.css';
import $ from 'jquery';

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
        var Base64 = require('js-base64').Base64;
        this.state = {
            cpfBASE64: this.props.match.params.cpf,
            cpf: Base64.decode(this.props.match.params.cpf),
            addressSintoma: 0,
            arrayNomeSintoma: [],
            arrayIdSintoma: [],
            text: '',
            level: -1,
            disabledButton: true,
            imagem: 'https://i.pinimg.com/736x/5f/3d/f9/5f3df9a20c35308eb27a153248628c2a.jpg'
        };
        this.setlevel = this.setlevel.bind(this);
        this.setCorrentIdNameSintoma = this.setCorrentIdNameSintoma.bind(this);
        this.setArraySintomas();
    }

    setlevel(event) {

        if (this.state.addressSintoma <= this.state.arrayIdSintoma.length) {
            this.setState({
                level: parseInt(event.target.getAttribute('id')),
                disabledButton: false
            });
        }
    }

    contains(value, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true
            }
        }
        return false
    }

    removeAlredyResponded(arrayOfValuesToRemove) {
        var newArrayNomeSintoma = this.state.arrayNomeSintoma
        var newArrayIdSintoma = this.state.arrayIdSintoma
        for (let i = 0; i < newArrayIdSintoma.length; i++) {
            var valueId = newArrayIdSintoma[i]
            if (this.contains(valueId, arrayOfValuesToRemove)) {
                newArrayIdSintoma.splice(i, 1)
                newArrayNomeSintoma.splice(i, 1)
                i -= 1
            }
        }
        this.setState({
            arrayIdSintoma: newArrayIdSintoma,
            arrayNomeSintoma: newArrayNomeSintoma
        },
            this.setCorrentIdNameSintoma()
        )
    }

    setArraySintomas() {
        //setar apenas os sintomas que não foram/ respondidos usuarios/05189065154/sintomas/registros?data=2020-05-16
        var sintomasAlredyResponded = []
        api.get('/sintomas').then((res) => (
            res.data.map((value) =>
                this.setState({
                    arrayNomeSintoma: this.state.arrayNomeSintoma.concat(value.nome),
                    arrayIdSintoma: this.state.arrayIdSintoma.concat(value.id)
                })
            ),
            api.get('usuarios/' + this.state.cpf + '/sintomas/registros?data=' + this.date()).then((res) => (
                res.data.map((value) =>
                    sintomasAlredyResponded = sintomasAlredyResponded.concat(value.sintoma.id)
                ),
                this.removeAlredyResponded(sintomasAlredyResponded)
            ))
        ))
        console.log(this.state)
    }

    date() {
        var today = new Date()
        var month = "" + (today.getMonth() + 1)
        var day = "" + today.getDate()
        var monthWith2Digts = month.length < 2 ? "0" + month : month
        var dayWith2Digts = day.length < 2 ? "0" + day : day
        return today.getFullYear() + '-' + monthWith2Digts + '-' + dayWith2Digts
    }

    setCorrentIdNameSintoma(event) {
        if (this.state.level !== -1) {
            var adress = this.state.addressSintoma - 1
            api.post('usuarios/' + this.state.cpf + '/sintomas/' + this.state.arrayIdSintoma[adress], {
                nivel: this.state.level,
                data: this.date()
            }).then(function (response) {
                console.log(response)
            })
        }
        if (this.state.addressSintoma < this.state.arrayIdSintoma.length) {
            this.setState({
                addressSintoma: this.state.addressSintoma + 1,
                text: 'Qual é seu level de ' + this.state.arrayNomeSintoma[this.state.addressSintoma] + "?",
                disabledButton: true
            })
        }
        else {
            this.setState({
                addressSintoma: this.state.addressSintoma + 1,
                text: 'acabou',
                disabledButton: true,
                imagem: 'https://pm1.narvii.com/6704/6e0f2fa15572d5e4af3ce47024acb7cf384a6a56_hq.jpg'
            })
        }

    }
    render() {
        $("button").on('click', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active')
        })
        const active = {
            marginLeft: 10000
        };
        return (

            <div id="pergunta">
                <Header cpf={this.state.cpfBASE64} />
                <div className="img-content">
                    <h1> {this.state.text}</h1>
                    <img src={this.state.imagem} alt='Pessoa Doente' />

                </div>
                <div className="buttons">
                    <MyButton id="0" onClick={this.setlevel} label="0" />
                    <MyButton id="1" onClick={this.setlevel} label="1" />
                    <MyButton id="2" onClick={this.setlevel} label="2" />
                    <MyButton id="3" onClick={this.setlevel} label="3" />
                    <MyButton id="4" onClick={this.setlevel} label="4" />
                    <MyButton id="5" onClick={this.setlevel} label="5" />
                </div>
                <div className="button-proximo">
                <MyButton disabled={this.state.disabledButton} onClick={this.setCorrentIdNameSintoma} style={active} label="Próximo" />
                </div>
            </div>
        )
    }
}

export default Pergunta