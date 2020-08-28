import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import Auth from '../../shared/auth';
import { useSnackbar } from 'notistack';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectUnidades from '../../components/SelectUnidades'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MensagemBoasVindas from '../../components/MensagemBoasVindas'
import Grid from "@material-ui/core/Grid/Grid";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as UnidadeActions } from "../../redux/store/ducks/dadosUnidade";


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

function Unidade(props) {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const history = useHistory();
	const [unidade, setUnidade] = useState('');
	const token = Auth.getToken();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const {updateNome} = props;


    const handleChange = (value) => {
		setUnidade(value);
		
	};

	async function handleSubmit(event) {
        event.preventDefault();
        setError(false);
        setLoading(true);
        
        if (!unidade) {
            setError(true);
            setLoading(false);
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
                setLoading(false);
                if(response.data.dados.length) {
                    localStorage.setItem('olAtual', unidade);
                    localStorage.setItem('detalhes', JSON.stringify(response.data.dados[0]));
                    updateNome(response.data.dados[0].unidade + ' ' + response.data.dados[0].unidade_nome)
                    history.push('/info', { detail: response.data.dados[0]});

                } else {
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
        setLoading(false);

    }

    return (
		<React.Fragment>
		<CssBaseline/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid>
                    <Container>

                        <MensagemBoasVindas />

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
                                Pesquisar
                            </Button>
                        </div>
                        <div className={classes.loading}>
                            { loading && (
                                <CircularProgress />
                            )}
                        </div>


                    </Container>
                </Grid>

            </Grid>



		</React.Fragment>
    );
}



const mapStateToProps = state => ({
    dadosUnidade: state.dadosUnidade
})

const mapDispacthToProps = dispatch => bindActionCreators(UnidadeActions,dispatch);


export default connect(mapStateToProps,mapDispacthToProps)(Unidade);
