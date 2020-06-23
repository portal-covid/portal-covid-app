import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import Auth from '../../shared/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';






import Divider from '@material-ui/core/Divider';



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

    const formData = {
        metragem_administrativo: data['infraestrutura']['metragem_administrativo'],
        metragem_pericia_medica: data['infraestrutura']['metragem_pericia_medica'],
        qtd_guiches: data['infraestrutura']['qtd_guiches'],
        qtd_salas_ass: data['infraestrutura']['qtd_salas_ass'],
        salas_pericia: data['infraestrutura']['salas_pericia'],
        qtd_scanner: data['infraestrutura']['qtd_scanner'],
    };

    const [formSelect, setFormSelect] = useState({ area_compartilhada: data['infraestrutura']['area_compartilhada'] ? '1': '0'});
    const [form, setForm] = useState(formData);
    const token = Auth.getToken();

    const handleInputChange = (event) => {
        setForm({...form,
            [event.target.name]: event.target.value
        });



    };


    const handleInputChangeSelect = (event) => {
        setFormSelect({...formSelect,
            area_compartilhada: event.target.value
        });

        if(event.target.value){
            setForm({...form,
                metragem_pericia_medica: 0
            });
        }



    };



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

        resp['dados'].area_compartilhada = formSelect.area_compartilhada == '1' ? true : false;

        try {

            await api.post('unidades', resp, {
                headers: {"Authorization" : "Bearer " + token }
            }).then(response => {


                if(response.data.ok){
                    enqueueSnackbar('Dados salvos com sucesso!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });
                    getRelatorio(data['_id']);
                }else{

                    setLoading(false);
                    enqueueSnackbar('Erro ao salvar os dados! - ' + response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }

            })
        } catch(error) {

            setLoading(false);
            let mensagem = error.toString();

            if(mensagem === "Error: Request failed with status code 401"){
                mensagem = 'Sessão expirada - Refazer login'
            }

            enqueueSnackbar('Erro ao salvar os dados!  ' + mensagem, {
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
            <CssBaseline />
            <Alert severity="info">
                <AlertTitle>Gestores</AlertTitle>
                <p>Prezado Gestor, esta aba é destinada a demonstrar a compilação do número de infraestrutura da sua unidade. Para alterações, informe os novos valor desejado e clique em SALVAR.</p>
            </Alert>
            <form onSubmit={handleSubmit} className={classes.root}>

                <Grid container >
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
                                        <RadioGroup  row aria-label="Área de espera compartilhada entre perícia médica e administrativo"
                                                     name="area_compartilhada"
                                                     value={formSelect.area_compartilhada}
                                                     onChange={handleInputChangeSelect }>
                                            <FormControlLabel value="1" control={<Radio />} label="Sim" />
                                            <FormControlLabel value="0" control={<Radio />} label="Não" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container >
                    <Grid item xs={12}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color='primary'>
                                        Metragens em (M<sup>2</sup>)
                                    </Typography>
                                    <Box display="flex" justifyContent="center">
                                        <Alert severity="info">Para os casos de area compartilhada, basta informar a área administrativa!</Alert>

                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={5}>

                                    <FormControl fullWidth className={classes.margin}>
                                        <InputLabel  htmlFor="metragem_administrativo"> Sala de espera do Administrativo</InputLabel>

                                        <Input id="metragem_administrativo"
                                               value={form.metragem_administrativo}
                                               name="metragem_administrativo"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a metragem da sala de espera da área administrativa"
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12} md={6}>

                                    <FormControl fullWidth className={classes.margin}>
                                        <InputLabel htmlFor="metragem_administrativo"> Sala de espera da Perícia Médica</InputLabel>
                                        <Input id="metragem_pericia_medica"
                                               value={form.metragem_pericia_medica}
                                               name="metragem_pericia_medica"
                                               onChange={handleInputChange}
                                               disabled = {formSelect.area_compartilhada == '1'}
                                               aria-describedby="Informe a metragem da sala de espera da área de perícia médica"
                                        />
                                    </FormControl>

                                </Grid>



                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>



                <Grid container >
                    <Grid item xs={12}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color='primary'>
                                        Salas, consultórios e guichês
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>

                                    <FormControl fullWidth className={classes.margin}>
                                        <InputLabel htmlFor="qtd_salas_ass"> Quantidade de salas de assistente social</InputLabel>
                                        <Input id="qtd_salas_ass"
                                               value={form.qtd_salas_ass}
                                               name="qtd_salas_ass"
                                               onChange={handleInputChange}
                                               aria-describedby="Informe a quantidade de salas de atendimento para assistente social"
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12} md={4}>

                                    <FormControl fullWidth className={classes.margin}>
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

                                    <FormControl fullWidth className={classes.margin}>
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
                </Grid>
                <Grid container >
                    <Grid item xs={12}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color='primary'>
                                        Equipamentos
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>

                                    <FormControl fullWidth className={classes.margin}>
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