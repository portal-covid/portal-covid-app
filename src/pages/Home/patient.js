import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useSnackbar } from 'notistack';
import api from '../../services/api';
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
	table: {
		minWidth: 650,
	},
	tableContainer: {
		padding: 0
	},
	rowHead: {
		backgroundColor: '#bdbdbd'
	},
	margin: {
		margin: theme.spacing(1),
	},
	marginTop: {
		marginTop: 20
	},
	formControl: {
		fullWidth: true,
		display: 'flex',
	},
	title: {
		fontSize: 14,
	},
	card: {
		border: '1px solid #f3f3f3',
	},
	buttonCancel: {
		marginTop: 10
	}
}));

export default function HomePatient() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [especialidade, setEspecialidade] = useState('');
	const [atendimentoPendente, setAtendimentoPendente] = useState({});
	const [atendimentoAndamento, setAtendimentoAndamento] = useState({});
	const [pendente, setPendente] = useState(false);
	const [andamento, setAndamento] = useState(false);
	const [especialidades, setEspecialidades] = useState([]);
	const [filasAtendimento, setFilasAtendimento] = useState([]);
	const token = Auth.getToken();
	const userId = Auth.getUserId();

	useEffect(() => {
		try {
			api.get('Especialidades').then(response => {
				setEspecialidades(response.data);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar a lista de especialidades!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}

		// verificar se tem consulta aguardando atendimento
		getAguardandoAtendimento();

		// atualiza a fila de atendimento
		refreshFilaAtendimento();

		// verificar se tem consulta iniciada pelo profissional
		atendimentoIniciadoProfissional();

		setInterval(() => {
			getAguardandoAtendimento();
			refreshFilaAtendimento();
			atendimentoIniciadoProfissional();
		}, 10000);

	}, [enqueueSnackbar]);

	const getAguardandoAtendimento = () => {
		try {
			api.get('pacientes/' + userId + '/consultas', { 
				headers: {"Authorization" : token },
				params: {
					filter: {
						"where":{
							"situacao":"PENDENTE"
						},
						"include":["profissional","filaAtendimento"]
					}
				}
			})
			.then(response => {
				if (response.data.length) {
					let d = new Date(response.data[0].dataHoraSolicitacao);
					let date = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
					let hour = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
					
					setAtendimentoPendente({
						especialidade: response.data[0].filaAtendimento.especialidade,
						data: date,
						hora: hour,
						id: response.data[0].id
					});

					setPendente(true);
				} else {
					setPendente(false);
				}
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar as filas de atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}

	const atendimentoIniciadoProfissional = () => {
		try {
			api.get('pacientes/' + userId + '/consultas', { 
				headers: {"Authorization" : token },
				params: {
					filter: {
						"where":{
							"situacao":"EM_ANDAMENTO"
						},
						"include":["profissional","filaAtendimento"]
					}
				}
			})
			.then(response => {

				if (response.data.length) {
					let d = new Date(response.data[0].dataHoraSolicitacao);
					let date = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
					let hour = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
					
					setAtendimentoAndamento({
						especialidade: response.data[0].filaAtendimento.especialidade,
						data: date,
						hora: hour,
						whereby: response.data[0].profissional.whereby
					});
					setAndamento(true);
				} else {
					setAndamento(false);
				}
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar as consultas em andamento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}
	
	const refreshFilaAtendimento = () => {
		try {
			api.get('Especialidades/detalhes-filas-de-atendimento', { headers: {"Authorization" : token } })
			.then(response => {
				setFilasAtendimento(response.data);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar as filas de atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}

	const handleClickOpen = () => {
		setEspecialidade('');
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleEnter(event){
		event.preventDefault();

		try {
			await api.post('pacientes/' + userId + '/solicitar-consulta/' + especialidade, {}, { 
				headers: {"Authorization" : token } 
			}).then(response => {
				setOpen(false);
				getAguardandoAtendimento();
				refreshFilaAtendimento();
				enqueueSnackbar('Solicitação realizada com sucesso!', { 
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					  },
				});
			});
		} catch(error) {
			enqueueSnackbar(error.response.data.error.message, { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}

	async function handleClickCancel(event){
		event.preventDefault();

		try {
			await api.post('pacientes/' + userId + '/consulta/' + atendimentoPendente.id + '/cancelar', {}, { 
				headers: {"Authorization" : token } 
			}).then(response => {
				setOpen(false);
				refreshFilaAtendimento();
				getAguardandoAtendimento();
				enqueueSnackbar('Cancelamento realizado com sucesso!', { 
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					  },
				});
			});
		} catch(error) {
			enqueueSnackbar('Ocorreu um erro no cancelamento do pedido!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}

	const handleClickStart = (event) => {
		event.preventDefault();
		window.open('https://whereby.com/' + atendimentoAndamento.whereby);
	}

	return (
		<div className={classes.root}>
		<CssBaseline />
			<main className={classes.content}>
				{ (() => {
					if (!pendente && !andamento) {
						return (
							<div>
								<Typography variant="h6" color="inherit" noWrap>
									Atendimento
								</Typography>
								<Divider />
								
								<Button 
									size="large" 
									onClick={handleClickOpen}
									variant="contained" 
									color="secondary" 
									className={classes.margin}>
									QUERO ENTRAR EM UMA FILA DE ATENDIMENTO
								</Button>
							</div>
						)
					}
				})()}

				{ (() => {
					if (pendente || andamento) {
						return (
							<div>
								<Typography variant="h6" color="inherit" noWrap>
									Atendimento solicitado
								</Typography>

								<Card className={classes.card}>
									{ pendente && (
									<CardContent>
										<Typography color="primary" variant="body1" gutterBottom>
											Especialidade: <b>{atendimentoPendente.especialidade }</b>
										</Typography>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											Data da Solicitação: {atendimentoPendente.data } <br />
											Hora da Solicitação: {atendimentoPendente.hora }
										</Typography>

										<Button
											disabled = {true}
											size="large"
											variant="contained" 
											color="primary" 
											className={classes.buttonCancel}>
											INICIAR O ATENDIMENTO
										</Button>
										&nbsp;
										<Button 
											size="large" 
											onClick={handleClickCancel}
											variant="contained" 
											color="secondary" 
											className={classes.buttonCancel}>
											CANCELAR SOLICITAÇÃO
										</Button>
									</CardContent>
									)}

									{ andamento && (
									<CardContent>
										<Typography color="primary" variant="body1" gutterBottom>
											Especialidade: <b>{atendimentoAndamento.especialidade }</b>
										</Typography>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											Data da Solicitação: {atendimentoAndamento.data } <br />
											Hora da Solicitação: {atendimentoAndamento.hora }
										</Typography>

										<Button
											size="large" 
											onClick={handleClickStart}
											variant="contained" 
											color="primary" 
											className={classes.buttonCancel}>
											INICIAR O ATENDIMENTO
										</Button>
										&nbsp;
										<Button 
											disabled = {true}
											size="large"
											variant="contained" 
											color="secondary" 
											className={classes.buttonCancel}>
											CANCELAR SOLICITAÇÃO
										</Button>
									</CardContent>
									)}
								</Card>
							</div>
						)
					}
				})()}
				
				<Typography variant="h6" color="inherit" className={classes.marginTop} noWrap>
					Fila de Atendimento
				</Typography>
				<TableContainer component={Paper} className={classes.tableContainer}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow className={classes.rowHead}>
								<TableCell>Especialidade</TableCell>
								<TableCell align="center">Qtd. na Fila</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filasAtendimento.map((row, index) => (
								<TableRow key={index} 
									style ={ index % 2? { background : "#f3f3f3" }:{ background : "white" }}>
									<TableCell component="th" scope="row">
										{row.nome}
									</TableCell>
									<TableCell align="center">{
										(row.detalhesFilasAtendimento.hasOwnProperty(0)) ?
										(row.detalhesFilasAtendimento[0].proximasConsultas).length : '0'
									}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Atendimento</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Selecione a especialidade que deseja entrar na fila de atendimento 
						</DialogContentText>
						<FormControl className={classes.formControl}>
							<InputLabel id="especialidade-label">Especialidade</InputLabel>
							<Select
								labelId="especialidade-label"
								id="especialidade"
								name="especialidade"
								fullWidth
								value={especialidade}
								onChange={e => setEspecialidade(e.target.value)}
							>
								{especialidades.map((esp) => (
									<MenuItem key={esp.id} value={esp.nome}>
										{esp.nome}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancelar
						</Button>
						<Button onClick={handleEnter} color="primary">
							Entrar
						</Button>
					</DialogActions>
				</Dialog>
			</main>
		</div>
	);
}