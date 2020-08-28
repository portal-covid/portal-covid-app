import React from 'react';
import { Switch, Redirect } from 'react-router';
import PrivateRoute from '../PrivateRoute';
import Home from './Home';
import Pessoal from './Pessoal';
import Info from './Info';
import Infra from './Infra';
import Epi from './Epi';
import Contratos from './Contratos';
import Resumo from './Resumo';
import Simulador from './Simulador';
import Desenv from './Desenv';
import Gerencia from './Gerencia';
import HistoricoExclusao from './HistoricoExclusao';

const MainRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/info' component={Info} />
            <PrivateRoute exact path='/pessoal' component={Pessoal} />
            <PrivateRoute exact path='/infra' component={Infra} />
            <PrivateRoute exact path='/epi' component={Epi} />
            <PrivateRoute exact path='/contratos' component={Contratos} />
            <PrivateRoute exact path='/resumo' component={Resumo} />
            <PrivateRoute exact path='/simulador' component={Simulador} />
            <PrivateRoute exact path='/desenv' component={Desenv} />
            <PrivateRoute exact path='/gerencia' component={Gerencia} />
            <PrivateRoute exact path='/historico_exclusao' component={HistoricoExclusao} />
            <Redirect from='*' to='/' />
        </Switch>
    );

}
export default MainRoutes;
