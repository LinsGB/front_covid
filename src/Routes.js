import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Dados from './pages/dados';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Perguntas from './pages/perguntas';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dados} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" exact component={Cadastro} />
                <Route path="/perguntas" exact component={Perguntas} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;