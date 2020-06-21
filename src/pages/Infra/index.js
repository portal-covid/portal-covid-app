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
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper/Paper";


import Divider from '@material-ui/core/Divider';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";


const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
          margin: theme.spacing(1),
      },
      margin: {
          margin: theme.spacing(1),
      },
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
                <p>Prezado Gestor, esta aba é destinada a demonstrar a compilação do número de infraestrutura da sua unidade. Para alterações, informe os novos valor desejado e clique em SALVAR.</p>
            </Alert>
            <form onSubmit={handleSubmit} className={classes.root}>


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color='primary'>
                                        Infraestrutura
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Área de espera compartilhada entre perícia médica e administrativo?</FormLabel>
                                        <RadioGroup  row aria-label="gender"
                                                    name="area_compartilhada"
                                                    value={form.area_compartilhada}
                                                    onChange={handleInputChange}>
                                            <FormControlLabel value="1" control={<Radio />} label="Sim" />
                                            <FormControlLabel value="0" control={<Radio />} label="Não" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>


                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} spacing={2}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary" >
                                        Metragens em (M<sup>2</sup>)
                                        <Box display="flex" justifyContent="center">
                                            <Alert severity="info">Para os casos de area compartilhada, basta informar a área administrativa!</Alert>

                                        </Box>
                                        <Divider />

                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl>
                                        <InputLabel htmlFor="metragem_administrativo"> Sala de espera do Administrativo</InputLabel>

                                        <Input id="metragem_administrativo"
                                               value={form.metragem_administrativo}
                                               name="metragem_administrativo"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a metragem da sala de espera da área administrativa"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl>
                                        <InputLabel htmlFor="metragem_administrativo"> Sala de espera da Perícia Médica</InputLabel>
                                        <Input id="metragem_pericia_medica"
                                               value={form.metragem_pericia_medica}
                                               name="metragem_pericia_medica"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a metragem da sala de espera da área de perícia médica"
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} spacing={2}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary" >
                                        Salas, consultórios e guichês
                                        <Divider />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl>
                                        <InputLabel htmlFor="qtd_salas_ass"> Quantidade de salas de assistente social</InputLabel>
                                        <Input id="qtd_salas_ass"
                                               value={form.qtd_salas_ass}
                                               name="qtd_salas_ass"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a quantidade de salas de atendimento para assistente social"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="salas_pericia">Quantidade de consultórios</InputLabel>
                                        <Input id="salas_pericia"
                                               value={form.salas_pericia}
                                               name="salas_pericia"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a quantidade de consultórios médicos"
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="salas_pericia">Quantidade de guichês</InputLabel>
                                        <Input id="qtd_guiches"
                                               value={form.qtd_guiches}
                                               name="qtd_guiches"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a quantidade de guichês para atendimento"
                                        />
                                    </FormControl>

                                </Grid>


                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} spacing={2}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>

                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" >
                                    Equipamentos
                                    <Divider />
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <FormControl>
                                    <InputLabel htmlFor="salas_pericia"> Quantidade de scanners</InputLabel>
                                    <Input id="qtd_scanner"
                                           value={form.qtd_scanner}
                                           name="qtd_scanner"
                                           onChange={handleInputChange}
                                           aria-describedby="Informe a quantidade de scanners para INSS Digital em funcionamento na APS"
                                    />
                                </FormControl>

                            </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>

                <Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>

                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                salvar
                            </Button>
                        </Box>


                    </Grid>
                </Grid>
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
			</form>
        </React.Fragment>
    );
}