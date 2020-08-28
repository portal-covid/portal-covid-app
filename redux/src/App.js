import React from 'react';
import { Switch, Route } from 'react-router';
import './global.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Unidade from './pages/Unidade';
import PrivateRoute from './PrivateRoute';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux'
import store from './redux/store/index'

function App() {

    return (
            <Provider store={store}>
                <div>
                  <SnackbarProvider maxSnack={3}>
                    <Switch>
                      <Route path='/login' component={Login} />
                      <Route path='/unidade' component={Unidade} />
                      <PrivateRoute path='*' component={Main} />
                    </Switch>
                  </SnackbarProvider>
                </div>
            </Provider>
  );
}

export default App;
