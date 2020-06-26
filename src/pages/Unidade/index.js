import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import Auth from '../../shared/auth';
import { useSnackbar } from 'notistack';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectUnidades from '../../components/SelectUnidades'
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	title: {
		marginTop: 30,
		marginBottom: 30
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '100%',
		marginTop: 30
	},
	select: {
		backgroundColor: '#fff'
	},
	divButton: {
		width: '100%',
        textAlign: 'center',
	},
	button: {
		marginTop: 10,
    },
    loading: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    }
}));

export default function Unidade() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const history = useHistory();
	const [unidade, setUnidade] = useState('');
	const token = Auth.getToken();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
	
	const handleChange = (value) => {

		setUnidade(value);
		
	};

	async function handleSubmit(event) {
        event.preventDefault();
        setError(false);
        setLoading(true);
        
        if (!unidade) {
            setError(true);
            return false;
        }

		let data = {
			"unidades" : [unidade],
			"tipoRelatorio": "RecursosUnidades"
		};

		try {
            await api.post('relatorio', data, { 
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                if(response.data.dados.length) {
                    localStorage.setItem('olAtual', unidade);
                    localStorage.setItem('detalhes', JSON.stringify(response.data.dados[0]));
                    setLoading(false);
                    history.push('/info', { detail: response.data.dados[0]});
                } else {
                    setLoading(false);
                    enqueueSnackbar('Não foi encontrado dados para esta unidade!', { 
                        variant: 'info',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        }
                    });
                }
            });
        } catch(error) {
            setLoading(false);
            enqueueSnackbar('Erro ao retornar os dados!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
        }
	}

    return (
		<React.Fragment>
			<Container className={classes.root} maxWidth="sm">
				<Typography component="h2" variant="h4" align="center" color="textPrimary" className={classes.title}>
					Bem-vindo ao Portal COVID-19
				</Typography>
				<Typography variant="h6" align="center" color="textSecondary" paragraph>
					Portal do INSS para divulgar dados e informações relacionados ao Coronavírus (COVID-19) na Instituição. Para informações mais detalhadas, selecione a unidade abaixo e clique em pesquisar.
				</Typography>
				<FormControl variant="outlined" className={classes.formControl}>
					<SelectUnidades onChange={handleChange}/>
				</FormControl>
                { error && (
                    <Alert severity="error">Selecione uma unidade!</Alert>
                )}
				<div className={classes.divButton}>
					<Button 
						size="large" 
						variant="contained" 
						color="primary" 
						className={classes.button}
						onClick={handleSubmit}>
						Entrar
					</Button>
				</div>
                <div className={classes.loading}>
                { loading && (
                    <CircularProgress />
                )}
                </div>
          	</Container>
		</React.Fragment>
    );
}