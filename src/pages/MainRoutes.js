import React from 'react';
import { Switch, Redirect } from 'react-router';
import PrivateRoute from '../PrivateRoute';
import Home from './Home';
import Form from './Form';

const MainRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/form' component={Form} />
            <Redirect from='*' to='/' />
        </Switch>
    );

}
export default MainRoutes;
