import React from 'react';
import { Switch, Redirect } from 'react-router';
import PrivateRoute from '../PrivateRoute';
import Home from './Home';
import Historico from './Historico';
import Atendimento from './Atendimento';

const MainRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/historico' component={Historico} />
            <PrivateRoute exact path='/atendimento/:id' component={Atendimento} />
            <Redirect from='*' to='/' />
        </Switch>
    );

}
export default MainRoutes;
