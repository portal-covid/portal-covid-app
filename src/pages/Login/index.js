import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import api from '../../services/api';
import ImageLogin from '../../assets/bg.jpg';
import LogoIMG from '../../assets/logo_INSS.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: `url(${ImageLogin})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	async function handleLogin(event) {
		event.preventDefault();

		let data = {
			username: email,
			password: password
		}

		try {
			await api.post('login', data).then(response => {
				localStorage.setItem('authToken', response.data.id);

				enqueueSnackbar('Bem-vindo ao Portal de COVID-19!', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					  },
				});
				history.push('/');
			});
		} catch(error) {
			enqueueSnackbar('Email ou senha incorretos!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<img src={LogoIMG} width="120px" style={{marginBottom: 20}}/>
					<Typography component="h1" variant="h5" align="center">
						Portal COVID-19
					</Typography>
					<form onSubmit={handleLogin} className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							name="email"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Senha"
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Entrar
						</Button>
					</form>
        		</div>
      		</Grid>
    	</Grid>
	);
}
