import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Formulario from './components/Formulario';
import Pergunta from './components/Pergunta';
import Graficos from './components/Graficos';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Formulario} />
                <Route path="/pergunta:cpf" render={(props) => <Pergunta {...props}/>} />
                <Route path="/Graficos:cpf" render={(props) => <Graficos {...props}/>} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;