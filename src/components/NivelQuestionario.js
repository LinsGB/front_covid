import React from 'react'


class NivelQuestionario extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nivel: 0 };
        this.nivelHandleChange = this.nivelHandleChange.bind(this);
    }

    nivelHandleChange(event){
        var numero = parseInt(event.target.getAttribute('id'))
        this.setState({
            nivel : numero
        });
    }

    render() {
        return (
            <div class="btn-group">
                <button id="0" onClick = {this.nivelHandleChange}>0</button>
                <button id="1" onClick = {this.nivelHandleChange}>1</button>
                <button id="2" onClick = {this.nivelHandleChange}>2</button>
                <button id="3" onClick = {this.nivelHandleChange}>3</button>
                <button id="4" onClick = {this.nivelHandleChange}>4</button>
                <button id="5" onClick = {this.nivelHandleChange}>5</button>
                {this.state.nivel}
            </div>
        )
    }
}
export default NivelQuestionario