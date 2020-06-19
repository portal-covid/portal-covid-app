import React from 'react';
import { Switch, Redirect } from 'react-router';
import PrivateRoute from '../PrivateRoute';
import Home from './Home';
import Form from './Form';
import Info from './Info';
import Resumo from './Resumo';

const MainRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/info' component={Info} />
            <PrivateRoute exact path='/form' component={Form} />
            <PrivateRoute exact path='/resumo' component={Resumo} />
            <Redirect from='*' to='/' />
        </Switch>
    );

}
export default MainRoutes;
