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
import ImageLogin from '../../assets/portal.png';
import LogoIMG from '../../assets/logo_INSS.svg';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleLogin(event) {
		event.preventDefault();
		setLoading(true);

		let data = {
			email: email,
			senha: password
		}

		try {
			await api.post('auth', data).then(response => {
				localStorage.setItem('token', response.data.dados.token);
				localStorage.setItem('email', response.data.dados.mail);
				localStorage.setItem('nome', response.data.dados.nome);
				localStorage.setItem('cpf', response.data.dados.cpf);
				localStorage.setItem('isChefia', response.data.dados.isChefia);
				localStorage.setItem('ols', JSON.stringify(response.data.dados.decendentes));

				enqueueSnackbar('Bem-vindo ao Portal de COVID-19!', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					  },
				});
				setLoading(false);
				history.push('/unidade');
			});
		} catch(error) {
			setLoading(false);
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
							disabled={loading}
							className={classes.submit}
						>
							Entrar
						</Button>
					</form>
					{ loading && (
						<CircularProgress />
					)}
        		</div>
      		</Grid>
    	</Grid>
	);
}
