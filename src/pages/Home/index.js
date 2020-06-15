import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
  
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
	}
}));

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const history = useHistory();
	const [unidade, setUnidade] = useState('');
	const [unidades, setUnidades] = useState([]);
	
	useEffect(() => {
		setUnidades([
			{
				ol: "21004090",
				nome: 'Agência da Previdência Social Pinheiros'
			},
			{
				ol: "11022030",
				nome: 'Agência da Previdência Social Ibirité'
			},
			{
				ol: "11022040",
				nome: 'Agência da Previdência Social Pedro Leopoldo'
			},
			{
				ol: "11022050",
				nome: 'Agência da Previdência Social Betim'
			},
			{
				ol: "11022060",
				nome: 'Agência da Previdência Social Vespasiano'
			}
		]);
	}, [setUnidades]);
	
	const handleChange = (event) => {
		setUnidade(event.target.value);
	};

	async function handleSubmit(event) {
		event.preventDefault();

		let data = {
			"unidades" : [unidade],
			"tipoRelatorio": "RecursosUnidades"
		};

		try {
            await api.post('relatorio', data).then(response => {
                if(response.data.dados.length) {
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
					<InputLabel id="demo-simple-select-label">Unidade</InputLabel>
					<Select
						className={classes.select}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={unidade}
						onChange={handleChange}
						label="Unidade"
					>
						{unidades.map((unidade) => (
							<MenuItem key={unidade.ol} value={unidade.ol}>
							{unidade.ol} - {unidade.nome}
							</MenuItem>
						))}
					</Select>
				</FormControl>
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
          	</Container>
		</React.Fragment>
    );
}