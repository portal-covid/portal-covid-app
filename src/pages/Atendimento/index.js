import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import Auth from '../../shared/auth';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		overflow: 'auto',
		margin: 20
    },
    container: {
        backgroundColor: '#fff',
        margin: 0,
        padding: 8,
        width: 'auto'
    }
}));


export default function Relatorios() {
    const classes = useStyles();
    let { id } = useParams();
    const [observacao, setObservacao] = useState('');
    const [paciente, setPaciente] = useState({});
    const [profissional, setProfissional] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const token = Auth.getToken();
    const userId = Auth.getUserId();
    const history = useHistory();

	useEffect(() => {
        try {
			api.get('Consultas/' + id + '/paciente', { 
                headers: {"Authorization" : token } 
            }).then(response => {
                let paciente = response.data
                let d = new Date(response.data.dataNascimento);
                let date = String((d.getDate()+1)).padStart(2, "0")  + "/" + String((d.getMonth()+1)).padStart(2, "0") + "/" + d.getFullYear();
                paciente['dataNascimentoFormatada'] = date;
								
                setPaciente(paciente);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar os dados do paciente no atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
        }

        try {
			api.get('Consultas/' + id + '/profissional', { 
                headers: {"Authorization" : token } 
            }).then(response => {
                setProfissional(response.data);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar os dados do paciente no atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
        }
    }, [enqueueSnackbar]);

    const handleFinish = () => {
        let data = {
            idConsulta: id,
            observacao: observacao
        };

        try {
			api.post('profissionais/' + userId + '/encerrar-consulta', data, { 
                headers: {"Authorization" : token } 
            }).then(response => {
                enqueueSnackbar('Atendimento encerrado com sucesso!', { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                      },
                });
                history.push('/');
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar os dados do paciente no atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
        }
    }

    const handleClickOpenRoom = () => {
        window.open('https://whereby.com/' + profissional.whereby,  "_blank");
    }
	
	return (
		<div className={classes.root}>
			<CssBaseline />
			<main className={classes.content}>
                <Typography variant="h6" color="inherit" noWrap>
					Atendimento
				</Typography>
                <Divider />
                <Grid container spacing={3} className={classes.container}>
                    { paciente.nome && (
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Nome:</b> {paciente.nome}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.dataNascimento && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Data de Nascimento:</b> {paciente.dataNascimentoFormatada}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.sexo && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Sexo:</b> {paciente.sexo}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.cpf && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>CPF:</b> {paciente.cpf}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.identidade && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Identidade:</b> {paciente.identidade}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.email && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Email:</b> {paciente.email}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.tel && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Telefone:</b> {paciente.tel}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    { paciente.whatsapp && (
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" gutterBottom>
                                <span className={classes.text}>
                                    <b>Whatsapp:</b> {paciente.whatsapp}
                                </span>
                            </Typography>
                        </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" gutterBottom>
                        <span className={classes.text}>
                            <b>Endereço:</b> {paciente.logradouro}, {paciente.numero}, {paciente.complemento}, {paciente.bairro} - {paciente.cidade}/{paciente.estado}
                        </span>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>
                            <b>Descrição do atendimento</b>
                        </Typography>
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            placeholder="Escreva aqui a descrição do atendimento"
                            value={observacao}
                            onChange={e => setObservacao(e.target.value)}
                            multiline
                            rows={4}
                            rowsMax={8}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} align="center">
                        <Button 
                            onClick={handleClickOpenRoom}
                            variant="contained" 
                            color="secondary" 
                            className={classes.button}>
                            ABRIR A VÍDEO-CONFERÊNCIA
                        </Button>
                        &nbsp;
                        <Button 
                            onClick={handleFinish}
                            variant="contained" 
                            color="primary" 
                            className={classes.button}>
                            FINALIZAR O ATENDIMENTO
                        </Button>
                    </Grid>
                </Grid>
			</main>
		</div>
	);
}
