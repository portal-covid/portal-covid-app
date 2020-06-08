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
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import FindInPageIcon from '@material-ui/icons/FindInPage';
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
	icon: {
        color: '#000'
    }, 
    text: {
        display: 'block'
	},
	subtitle: {
		fontSize: 12
	}
}));

export default function HomePatient() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [filaAtendimento, setFilaAtendimento] = useState([]);
	const [andamento, setAndamento] = useState('');
	const [paciente, setPaciente] = useState({});
	const history = useHistory();
	const token = Auth.getToken();
	const role = Auth.getRole();
	const userId = Auth.getUserId();

	useEffect(() => {

		getFilaAtendimento();
		getConsultasAndamento();

		setInterval(() => {
			getFilaAtendimento();
			getConsultasAndamento();
		}, 10000);

	}, [enqueueSnackbar]);

	const getFilaAtendimento = () => {
		try {
            api.get('Especialidades/detalhes-filas-de-atendimento', 
				{ headers: {"Authorization" : token } })
			.then(response => {
				let atendimentos = [];
				response.data.forEach(element => {
					if (element.nome === role) {
						(element.detalhesFilasAtendimento).forEach(detalheFilaAtendimento => {
							(detalheFilaAtendimento.proximasConsultas).forEach(paciente => {
								
								let d = new Date(paciente.paciente.dataNascimento);
								let date = String((d.getDate()+1)).padStart(2, "0")  + "/" + String((d.getMonth()+1)).padStart(2, "0") + "/" + d.getFullYear();
								paciente.paciente['dataNascimentoFormatada'] = date;
								atendimentos.push(paciente.paciente);
							
							});
						});
					}
				});
				setFilaAtendimento(atendimentos);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar a fila de atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	}

	const getConsultasAndamento = () => {
		api.get('profissionais/' + userId + '/consultas', { 
			headers: {"Authorization" : token },
			params: {
				filter: {
					"where":{
						"situacao":"EM_ANDAMENTO"
					}
				}
			}
		}).then(response => {
			if (response.data.length > 0) {
				setAndamento(response.data[0].id);
			}
		});
	}

	const handleClickOpen = () => {
		try {
			api.post('profissionais/' + userId + '/atender-proximo-paciente', {}, { 
				headers: {"Authorization" : token },
				params: {
					filter: {
						"where":{
							"situacao":"EM_ANDAMENTO"
						}
					}
				}
			}).then(response => {
				setOpenConfirmation(false);
				history.push('/atendimento/' + response.data.id);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao iniciar o próximo atendimento!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
		}
	};

    const handleOpenDetails = (data) => {
        setPaciente(data)
        setOpen(true);
    }

    const handleClose = () => {
		setOpen(false);
	};

	const handleOpenConfirmation = () => {
		setOpenConfirmation(true);
	};

	const handleCloseConfirmation = () => {
		setOpenConfirmation(false);
	};

	const handleOpenAndamento = () => {
		history.push('/atendimento/' + andamento);
	}

	return (
		<div className={classes.root}>
		<CssBaseline />
			<main className={classes.content}>
				<div>
					<Typography variant="h6" color="inherit" noWrap>
						Atendimento
					</Typography>
					<Divider />
					
					<Button 
						disabled={(!filaAtendimento.length > 0) || (andamento.length > 0)}
						size="large" 
						onClick={handleOpenConfirmation}
						variant="contained" 
						color="secondary" 
						className={classes.margin}>
						ATENDER O PRÓXIMO DA FILA
					</Button>
					&nbsp;

					{(andamento.length > 0) && (
						<Button 
							size="large" 
							onClick={handleOpenAndamento}
							variant="contained" 
							color="primary" 
							className={classes.margin}>
							ATENDIMENTO EM ANDAMENTO
						</Button>
					)}
				</div>
				
				<Typography variant="h6" color="inherit" className={classes.marginTop} noWrap>
					Fila de Atendimento 
					<span className={classes.subtitle}>
					{ (filaAtendimento.length) ? ` - ${filaAtendimento.length} paciente(s) aguardando atendimento` : '' }
					</span>
				</Typography>
				{ (filaAtendimento.length > 0) && (
				<TableContainer component={Paper} className={classes.tableContainer}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow className={classes.rowHead}>
								<TableCell>Paciente</TableCell>
								<TableCell align="center">Data da Nascimento</TableCell>
                                <TableCell>Cidade</TableCell>
                                <TableCell align="center">Detalhes</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filaAtendimento.map((row, index) => (
								<TableRow key={index} 
									style ={ index % 2? { background : "#f3f3f3" }:{ background : "white" }}>
									<TableCell component="th" scope="row">
										{row.nome}
									</TableCell>
									<TableCell align="center">{row.dataNascimentoFormatada}</TableCell>
                                    <TableCell>{row.cidade}/{row.estado}</TableCell>
                                    <TableCell align="center">
                                        <Link
                                            to="#"
                                            onClick={() => handleOpenDetails(row)}>
                                            <FindInPageIcon className={classes.icon} />
                                        </Link>
                                    </TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				)}

				{ !filaAtendimento.length && (
					<Divider />
				)}

				{ !filaAtendimento.length && (
					<Typography variant="body2" color="inherit" noWrap>
						Não existe pacientes aguardando atendimento.
					</Typography>
				)}

				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Paciente</DialogTitle>
					<DialogContent>
                        <Typography variant="body2" gutterBottom>
							{ paciente.nome && (
								<span className={classes.text}>
                                	<b>Nome:</b> {paciente.nome}
                            	</span>
							)}
                            
							{ paciente.dataNascimento && (
								<span className={classes.text}>
									<b>Data de Nascimento:</b> {paciente.dataNascimentoFormatada}
								</span>
							)}
                            
							{ paciente.sexo && (
								<span className={classes.text}>
									<b>Sexo:</b> {paciente.sexo}
								</span>
							)}

							{ paciente.cpf && (
								<span className={classes.text}>
									<b>CPF:</b> {paciente.cpf}
								</span>
							)}
                            
							{ paciente.identidade && (
								<span className={classes.text}>
									<b>Identidade:</b> {paciente.identidade}
								</span>
							)}

							{ paciente.email && (
								<span className={classes.text}>
									<b>Email:</b> {paciente.email}
								</span>
							)}

							{ paciente.tel && (
								<span className={classes.text}>
									<b>Telefone:</b> {paciente.tel}
								</span>
							)}
                            
                            { paciente.whatsapp && (
								<span className={classes.text}>
									<b>Whatsapp:</b> {paciente.whatsapp}
								</span>
							)}
                            
                            <span className={classes.text}>
                                <b>Endereço:</b> {paciente.logradouro}, {paciente.numero}, {paciente.complemento}, {paciente.bairro} - {paciente.cidade}/{paciente.estado}
                            </span>
                        </Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Fechar
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog open={openConfirmation} onClose={handleCloseConfirmation} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Atendimento</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Deseja iniciar o atendimento? 
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseConfirmation} color="primary">
							Não
						</Button>
						<Button onClick={handleClickOpen} color="primary">
							Sim
						</Button>
					</DialogActions>
				</Dialog>
			</main>
		</div>
	);
}