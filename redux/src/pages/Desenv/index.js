import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import Auth from '../../shared/auth';
import { useSnackbar } from 'notistack';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";



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
		textAlign: 'center'
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

function Desenv(props) {
    const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const token = Auth.getToken();
    const [loading, setLoading] = useState(false);


	function convert(objectData){


        let filename = `export_${Math.floor(Date.now() / 1000)}.json`;
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

	async function handleSubmitSituacao(event) {
        event.preventDefault();
        setLoading(true);


		let data = {
			"tipoOperacao": "AtualizarSituacaoAps"
		};

		try {
            await api.post('unidades', data, {
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                setLoading(false);
                if(response.data.dados.length) {
                    enqueueSnackbar('Concluído!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        }
                    });
                } else {
                    enqueueSnackbar('verifique se atualizou!', {
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

	async function handleSubmiListagem(event) {
        event.preventDefault();
        setLoading(true);

		let data = {
			"tipoRelatorio": "UnidadesAbertas"
		};

		try {
            await api.post('servicos', data).then(response => {
                setLoading(false);
                if(response.data.dados.length) {
                    enqueueSnackbar('Concluído!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        }
                    });

                    convert(response.data.dados)
                } else {
                    enqueueSnackbar('verifique se atualizou!', {
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
	async function handleSubmiListagemAbertas(event) {
        event.preventDefault();
        setLoading(true);

		let data = {
			"tipoRelatorio": "UnidadesAbertas",
            "situacao": "Abre"
		};

		try {
            await api.post('servicos', data).then(response => {
                setLoading(false);
                if(response.data.dados.length) {
                    enqueueSnackbar('Concluído!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        }
                    });

                    convert(response.data.dados)
                } else {
                    enqueueSnackbar('verifique se atualizou!', {
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
            <CssBaseline />

                <Grid>
                    <Container>

                       {/* <div className={classes.divButton}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleSubmitGeo}>
                                Corrigir Geolocalização em Lote
                            </Button>
                        </div>*/}


                        <div className={classes.divButton}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleSubmitSituacao}>
                                Atualizar Situação das APS em LOTE
                            </Button>
                        </div>


                        <div className={classes.divButton}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleSubmiListagem}>
                                Gerar Lista Situacao APS - Completa
                            </Button>
                        </div>
                        <div className={classes.divButton}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleSubmiListagemAbertas}>
                                Gerar Lista Situacao APS - Abertas
                            </Button>
                        </div>



                        <div className={classes.loading}>
                            { loading && (
                                <CircularProgress />
                            )}
                        </div>
					</Container>
				</Grid>


		</React.Fragment>
    );
}


const mapStateToProps = state => ({
    dadosUnidade: state.dadosUnidade
})

const mapDispacthToProps = dispatch => bindActionCreators(UnidadeActions,dispatch);


export default connect(mapStateToProps,mapDispacthToProps)(Desenv);
