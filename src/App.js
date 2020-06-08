import React from 'react';
import { Switch, Route } from 'react-router';
import './global.css';
import Main from './pages/Main';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import { SnackbarProvider } from 'notistack';

function App() {
  return ( 
    <div>
      <SnackbarProvider maxSnack={3}>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute path='*' component={Main} />
        </Switch>
      </SnackbarProvider>
    </div>
  );
}

export default App;
