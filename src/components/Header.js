import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css'


class Header extends Component{
    render(){
        return(
            <div className="links">
            <NavLink className="button" activeClassName="active"to={"/graficos"+this.props.cpf}>Gráficos</NavLink>
            <NavLink className="button" activeClassName="active" to={"/pergunta"+this.props.cpf}>Pergunta</NavLink>
            </div>
        )
    }
}
export default Header;