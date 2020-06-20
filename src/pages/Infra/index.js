import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import Auth from '../../shared/auth';
import { Alert, AlertTitle } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: 30
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
},
}));

export default function Infra() {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    let data = {};
    if (JSON.parse(Auth.getDetalhes())) {
        data = JSON.parse(Auth.getDetalhes());
    } else {
        data = location.state.detail;
    }

    let area_compartilhada = data['infraestrutura']['area_compartilhada'] ? '1': '0';
    const formData = {
        area_compartilhada: area_compartilhada,
        metragem_administrativo: data['infraestrutura']['metragem_administrativo'],
        metragem_pericia_medica: data['infraestrutura']['metragem_pericia_medica'],
        qtd_guiches: data['infraestrutura']['qtd_guiches'],
        qtd_salas_ass: data['infraestrutura']['qtd_salas_ass'],
        salas_pericia: data['infraestrutura']['salas_pericia'],
        qtd_scanner: data['infraestrutura']['qtd_scanner'],
    }
	const [form, setForm] = useState(formData);
    const token = Auth.getToken();

	const handleInputChange = (event) => {
		setForm({...form,
		[event.target.name]: event.target.value
		});
    }
    
    async function getRelatorio(unidade) {

        let data = {
			"unidades" : [unidade],
			"tipoRelatorio": "RecursosUnidades"
        };
        
        try {
            await api.post('relatorio', data, { 
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                if(response.data.dados.length) {
                    localStorage.setItem('detalhes', JSON.stringify(response.data.dados[0]));
                    setLoading(false);
                    history.push('/info', { detail: response.data.dados[0]});
                } else {
                    setLoading(false);
                }
            });
        } catch(error) {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        let resp = {
            _id: data['_id'],
			tipoOperacao: "AtualizarDadosDeInfraestrutura",
        };
        resp['dados'] = form;
        resp['dados'].area_compartilhada = (resp['dados'].area_compartilhada) ? true : false;

        try {
            await api.post('unidades', resp, { 
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                enqueueSnackbar('Dados salvos com sucesso!', { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
                getRelatorio(data['_id']);
            });
        } catch(error) {
            setLoading(false);
            enqueueSnackbar('Erro ao salvar os dados!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        }
	}

    return (
        <React.Fragment>
            <Alert severity="info">
                <AlertTitle>Gestores</AlertTitle>
                <p>Prezado Gestor, esta aba é destinada a demonstrar a compilação do número de infraestrutura da sua unidade. É possível clicar em alterar dados, para validarmos a situação real das unidades de atendimento.</p>
            </Alert>
            <form onSubmit={handleSubmit} className={classes.root}>
                <Grid container className={classes.root} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Infraestrutura
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: 30}}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Área de espera compartilhada entre perícia médica e administrativo?</FormLabel>
                            <RadioGroup aria-label="gender" 
                                name="area_compartilhada" 
                                value={form.area_compartilhada} 
                                onChange={handleInputChange}>
								<FormControlLabel value="1" control={<Radio />} label="Sim" />
								<FormControlLabel value="0" control={<Radio />} label="Não" />
							</RadioGroup>
						</FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Metragem da sala de espera do Administrativo
                            </Typography>
                            <TextField id="metragem_administrativo" 
                                value={form.metragem_administrativo}
                                name="metragem_administrativo"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Metragem da sala de espera da Perícia Médica
                            </Typography>
                            <TextField id="metragem_pericia_medica" 
                                value={form.metragem_pericia_medica} 
                                name="metragem_pericia_medica"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
					<Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de salas de assistente social
                            </Typography>
                            <TextField id="qtd_salas_ass" 
                                value={form.qtd_salas_ass}
                                name="qtd_salas_ass"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Quantidade de consultórios
                            </Typography>
                            <TextField id="salas_pericia" 
                                value={form.salas_pericia}
                                name="salas_pericia"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
					<Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de guichês
                            </Typography>
                            <TextField id="qtd_guiches" 
                                value={form.qtd_guiches}
                                name="qtd_guiches"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de scanners
                            </Typography>
                            <TextField id="qtd_scanner" 
                                value={form.qtd_scanner}
                                name="qtd_scanner"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
				<Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Button type="submit" size="large" variant="contained" color="primary">
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
			</form>
        </React.Fragment>
    );
}