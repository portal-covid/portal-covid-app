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
import { useSnackbar } from 'notistack';
import DescriptionIcon from '@material-ui/icons/Description';
import api from '../../services/api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Auth from '../../shared/auth';
import Divider from '@material-ui/core/Divider';

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
    icon: {
        color: '#000'
    },
}));

export default function Relatorios() {
	const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [atendimentos, setAtendimentos] = useState([]);
	const [observacao, setObservacao] = useState('');
	const userId = Auth.getUserId();
	const token = Auth.getToken();

	useEffect(() => {
		try {
			api.get('profissionais/'+ userId + '/consultas', { 
				headers: {"Authorization" : token },
				params: {
					filter: {
						"where":{
							"situacao":"CONCLUIDA"
						},
						"include":["paciente"]
					}
				}
			})
			.then(response => {
				response.data.forEach(element => {
					let date = new Date(element.dataHoraSolicitacao);
					date = String((date.getDate())).padStart(2, "0")  + "/" + String((date.getMonth()+1)).padStart(2, "0") + "/" + date.getFullYear();
					element['data'] = date;

					let hourInicio = new Date(element.dataHoraInicio);
					hourInicio = String(hourInicio.getHours()).padStart(2, "0") + ":" + String(hourInicio.getMinutes()).padStart(2, "0");
					element['horaInicio'] = hourInicio;

					let hourFim = new Date(element.dataHoraTermino);
					hourFim = String(hourFim.getHours()).padStart(2, "0") + ":" + String(hourFim.getMinutes()).padStart(2, "0");
					element['horaFim'] = hourFim;
				});
				setAtendimentos(response.data);
			});
		} catch(error) {
			enqueueSnackbar('Erro ao retornar o histórico!', { 
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
			  	},
			});
        }
    }, [enqueueSnackbar]);

    const handleOpenDetails = (obs) => {
        setObservacao(obs);
        setOpen(true);
    }

    const handleClose = () => {
		setOpen(false);
	};
	
	return (
		<div className={classes.root}>
			<CssBaseline />
			<main className={classes.content}>
				<Typography variant="h6" color="inherit" noWrap>
					Histórico de Atendimentos concluídos
				</Typography>
				{ (atendimentos.length > 0) && (
				<TableContainer component={Paper} className={classes.tableContainer}>
					<Table className={classes.table} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow className={classes.rowHead}>
								<TableCell>Paciente</TableCell>
								<TableCell align="center">Data</TableCell>
								<TableCell align="center">Início</TableCell>
								<TableCell align="center">Fim</TableCell>
                                <TableCell align="center">Observação</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{atendimentos.map((row, index) => (
								<TableRow key={index} 
									style ={ index % 2? { background : "#f3f3f3" }:{ background : "white" }}>
									<TableCell component="th" scope="row">
										{row.paciente.nome}
									</TableCell>
									<TableCell align="center">{row.data}</TableCell>
									<TableCell align="center">{row.horaInicio}</TableCell>
									<TableCell align="center">{row.horaFim}</TableCell>
                                    <TableCell align="center">
                                        <Link
                                            to="#"
                                            onClick={() => handleOpenDetails(row.observacao)}>
											<DescriptionIcon alt="Descrição do atendimento" 
											className={classes.icon} />
                                        </Link>
                                    </TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				)}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Descrição do atendimento</DialogTitle>
					<DialogContent>
                        <Typography variant="body2" gutterBottom>
                            {observacao}
                        </Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Fechar
						</Button>
					</DialogActions>
				</Dialog>

				{ !atendimentos.length && (
					<Divider />
				)}

				{ !atendimentos.length && (
					<Typography variant="body2" color="inherit" noWrap>
						Não existe histórico de atendimento realizado por este profissional.
					</Typography>
				)}
			</main>
		</div>
	);
}
