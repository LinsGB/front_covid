import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Dados from './pages/dados';
import Login from './pages/login';
import Perguntas from './pages/perguntas';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/perguntas" exact component={Perguntas} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;