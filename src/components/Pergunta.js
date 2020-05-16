import React from 'react'
import imagemDoente from '../imagem/doente.jpg'
import api from '../service/api'


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
                <h1>{this.state.arrayNomeSintoma[this.state.adressSintoma]}</h1>
                <img src={imagemDoente} alt='Pessoa Doente' />
                <button onClick={this.setCorrentIdNameSintoma}> enviar </button>
            </div>
        )
    }
}

//blokar butão para só funcionar quando o formulario estiver marcado
//criar banco de imagens e alterar junto com o titulo
export default Pergunta