import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <div>
            <Link to={"/graficos"+this.props.cpf}>Graficos</Link>
            <Link to={"/pergunta"+this.props.cpf}>Pergunta</Link>
            </div>
        )
    }
}
export default Header;