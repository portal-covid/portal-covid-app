import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {emphasize, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useSnackbar } from 'notistack';

import Auth from '../../shared/auth';
import CapacidadeAtendimento from '../../components/CapacideAtedimento/CapacidadeAtendimento'
import Calculo from './Calculo';

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
        width: '100%'
    },
}))(Chip);

const useStyles = makeStyles((theme) => ({
	root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
	},
	card: {
		backgroundColor: theme.palette.background.paper,
	},
    cardStyleInfra : {
        minWidth: 275,
        minHeight: '16vw'
    },
    cardStyleCapacidade:{
        minWidth: 275,
        minHeight: '16vw'

    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function Simulador() {
	const { enqueueSnackbar } = useSnackbar()

	const classes = useStyles();
    const location = useLocation();
    let data = {};
    if (JSON.parse(Auth.getDetalhes())) {
        data = JSON.parse(Auth.getDetalhes());
    } else {
        data = location.state.detail;
    }
	const [dadosUnidade, setDadosUnidade] = useState(data);
	
	const [dados, setDados] = useState({
		_id: dadosUnidade._id,
		nome: dadosUnidade.unidade_nome,
		servidores_retorno: dadosUnidade.capacidade_de_atendimento[0].administrativo,
		pericia_medica_retorno: dadosUnidade.capacidade_de_atendimento[0].peritos,
		assistentes_retorno: dadosUnidade.capacidade_de_atendimento[0].assistente,
		metragem_administrativo: dadosUnidade.capacidade_de_atendimento[0].metragem_administrativo,
		metragem_pericia_medica: dadosUnidade.capacidade_de_atendimento[0].metragem_pericia_medica,
		qtd_salas_ass: dadosUnidade.capacidade_de_atendimento[0].qtd_salas_ass,
		salas_pericia: dadosUnidade.capacidade_de_atendimento[0].salas_pericia,
		qtd_guiches: dadosUnidade.capacidade_de_atendimento[0].qtd_guiches,

		espacoCompartilhado: dadosUnidade.capacidade_de_atendimento[0].metragem_pericia_medica ? "0" : "1",
	});
	const [pergunta, setPergunta] = useState(dados.espacoCompartilhado);
	
	const handleChange = (event) => {
		setPergunta(event.target.value);
		// setDados({
		// 	espacoCompartilhado: event.target.value
		// });
	}

	const handleInputChange = (event) => {
		setDados({
			...dados,
			[event.target.name]: event.target.value
		});
	}

	const handleSimular = (event) => {
		event.preventDefault();
		const retorno = Calculo.calcularCapacidade(dados);
		setDadosUnidade(prevState => ({
			capacidade_de_atendimento: {
				...prevState.capacidade_de_atendimento,
				administrativo: retorno.administrativo,
				assistente: retorno.assistente,
				peritos: retorno.peritos,
				administrativo_vagas_dia: retorno.administrativo_vagas_dia,
				assistentes_vagas_dia: retorno.assistentes_vagas_dia,
				pericia_vagas_dia: retorno.pericia_vagas_dia,
				pericia_vagas_hora_maximo: retorno.pericia_vagas_hora_maximo,
				assistentes_vagas_hora: retorno.assistentes_vagas_hora,
				administrativo_vagas_hora: retorno.administrativo_vagas_hora,
			}
			})
		);
	}

	return (
		<React.Fragment>
			<Grid container className={classes.root} spacing={1}>
				<CssBaseline/>
				<Grid item xs={12}>
				<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
								<StyledBreadcrumb
									color="primary"
									aria-current="page"
									component="a"
									href="#"
									label="Simular"
									icon={<HomeIcon fontSize="small"/>}
									onClick={handleSimular}
								/>
							</Breadcrumbs>
						</Grid>

					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6">
						Simulador
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Área de espera é compartilhada entre a Perícia Médica e o Administrativo?
							</Typography>
							<RadioGroup
								value={pergunta}
								onChange={handleChange}
								aria-label="Área de espera é compartilhada entre a Perícia Médica e o Administrativo?"
								name="espaco_compartilhado">
								<FormControlLabel value="1" control={<Radio />} label="Sim" />
								<FormControlLabel value="0" control={<Radio />} label="Não" />
							</RadioGroup>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={4}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Metragem da área de espera (em m²)
							</Typography>
							<FormControl>
								{
									pergunta == 1

										? <React.Fragment>
											<Typography variant="subtitle2" gutterBottom>
												Sala Espera
										</Typography>
											<TextField
												id="metragem_administrativo"
												value={dados.metragem_administrativo}
												name="metragem_administrativo"
												type="number"
												onChange={handleInputChange}
											/>
										</React.Fragment>
										: <React.Fragment>
											<Typography variant="subtitle2" gutterBottom>
												Administrativo
										</Typography>
											<TextField
												id="metragem_administrativo"
												value={dados.metragem_administrativo}
												name="metragem_administrativo"
												type="number"
												onChange={handleInputChange}
											/>
											<Typography variant="subtitle2" gutterBottom>
												Perícia Médica
										</Typography>
											<TextField
												id="metragem_pericia_medica"
												value={dados.metragem_pericia_medica}
												name="metragem_pericia_medica"
												type="number"
												onChange={handleInputChange}
											/>
										</React.Fragment>
								}
							</FormControl>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{ marginTop: 30 }}>
					<Typography variant="h6">
						Informe a quantidade de Servidores
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subtitle2" gutterBottom>
								Administrativo
							</Typography>
							<TextField
								id="servidores_retorno"
								value={dados.servidores_retorno}
								name="servidores_retorno"
								type="number"
								onChange={handleInputChange}
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subtitle2" gutterBottom>
								Peritos
							</Typography>
							<TextField
								id="pericia_medica_retorno"
								value={dados.pericia_medica_retorno}
								name="pericia_medica_retorno"
								type="number"
								onChange={handleInputChange}
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subtitle2" gutterBottom>
								Assistentes Sociais
							</Typography>
							<TextField
								id="assistentes_retorno"
								value={dados.assistentes_retorno}
								name="assistentes_retorno"
								type="number"
								onChange={handleInputChange}
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{ marginTop: 30 }}>
					<Typography variant="h6">
						Quantitativo
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subtitle2" gutterBottom>
								Número de guichês
							</Typography>
							<TextField
								id="qtd_guiches"
								value={dados.qtd_guiches}
								name="qtd_guiches"
								type="number"
								onChange={handleInputChange}
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subtitle2" gutterBottom>
								Número de Salas Perícia
							</Typography>
							<TextField
								id="salas_pericia"
								value={dados.salas_pericia}
								name="salas_pericia"
								type="number"
								onChange={handleInputChange}
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={3}>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subtitle2" gutterBottom>
								Número de Salas Assistentes Sociais
							</Typography>
							<TextField
								id="qtd_salas_ass"
								value={dados.qtd_salas_ass}
								name="qtd_salas_ass"
								type="number"
								onChange={handleInputChange}
							/>
						</CardContent>
					</Card>
				</Grid>

				<CapacidadeAtendimento classes={classes} {...dadosUnidade}/>
			</Grid>

		</React.Fragment>
	);
}