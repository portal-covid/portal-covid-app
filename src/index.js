import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router';
import history from './history';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from './theme/muiTheme';

ReactDOM.render(
    <Router history={history}>
        <MuiThemeProvider theme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </Router>,
    document.getElementById('root')
);
