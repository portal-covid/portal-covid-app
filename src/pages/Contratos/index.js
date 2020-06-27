import React, { useState } from 'react';
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
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AssignmentIcon from '@material-ui/icons/Assignment';
import Breadcrumbs from "@material-ui/core/Breadcrumbs/Breadcrumbs";
import NavigateNextIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Chip from '@material-ui/core/Chip';
import { withStyles} from '@material-ui/core/styles';
const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%'
    },
}))(Chip);


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

export default function Contratos() {
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
        limpeza_conservacao: data['contratos']['limpeza_conservacao'],
        vigilancia_ostensiva: data['contratos']['vigilancia']['ostensiva'],
        vigilancia_eletronica: data['contratos']['vigilancia']['eletronica'],
        manutencao_predial : data['contratos']['manutencao']['predial'],
        manutencao_ar_condicionado : data['contratos']['manutencao']['ar_condicionado'],
        manutencao_elevadores : data['contratos']['manutencao']['elevadores'],

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
            tipoOperacao: "AtualizarDadosDeContratos",
        };
        resp['dados'] = form;

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
            });
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
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                            <StyledBreadcrumb
                                color="primary"
                                aria-current="page"
                                component="p"
                                label="Contratos Essenciais"
                                icon={<AssignmentIcon fontSize="small"/>}
                            />
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <br/>
            </Grid>
            <Alert severity="info">
                <AlertTitle>Gestores</AlertTitle>
                <p>Prezado Gestor, esta aba é destinada a demonstrar a compilação dos dados referentes aos contratos da sua unidade. Para alterações, informe novos valores desejados e clique em SALVAR</p>
            </Alert>
            <form onSubmit={handleSubmit} className={classes.root}>

                <Grid container>
                    <Grid item xs={12}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color='primary'>
                                        Contratos Essenciais
                                    </Typography>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} md={5}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Limpeza e conservação</FormLabel>
                                                <RadioGroup row
                                                            aria-label="Limpeza e conservação"
                                                            name="limpeza_conservacao"
                                                            value={form.limpeza_conservacao}
                                                            onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica"  inputprops={{ 'aria-label': 'não se aplica' }}  control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>


                                            </FormControl>


                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Manutenção ar condicionado</FormLabel>
                                                <RadioGroup row
                                                            aria-label="Manutenção ar condicionado"
                                                            name="manutencao_ar_condicionado"
                                                            value={form.manutencao_ar_condicionado}
                                                            onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica"  inputprops={{ 'aria-label': 'não se aplica' }}  control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>


                                            </FormControl>


                                        </CardContent>
                                    </Card>
                                </Grid>



                                <Grid item xs={12} md={5}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Manutenção de elevadores</FormLabel>
                                                <RadioGroup row
                                                            aria-label="Manutenção de elevadores"
                                                            name="manutencao_elevadores"
                                                            value={form.manutencao_elevadores}
                                                            onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica"  inputprops={{ 'aria-label': 'não se aplica' }}  control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>


                                            </FormControl>


                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Manutenção Predial</FormLabel>
                                                <RadioGroup row
                                                            aria-label="manutencao_predial"
                                                            name="manutencao_predial"
                                                            value={form.manutencao_predial}
                                                            onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica"  inputprops={{ 'aria-label': 'não se aplica' }}  control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>


                                            </FormControl>


                                        </CardContent>
                                    </Card>
                                </Grid>






                                <Grid item xs={12} md={5}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Vigilância eletrônica</FormLabel>
                                                <RadioGroup row
                                                            aria-label="Vigilância eletrônica"
                                                            name="vigilancia_eletronica"
                                                            value={form.vigilancia_eletronica}
                                                            onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica"  inputprops={{ 'aria-label': 'não se aplica' }}  control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>


                                            </FormControl>


                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Vigilância ostensiva</FormLabel>
                                                <RadioGroup row
                                                            aria-label="Vigilância ostensiva"
                                                            name="vigilancia_ostensiva"
                                                            value={form.vigilancia_ostensiva}
                                                            onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica"  inputprops={{ 'aria-label': 'não se aplica' }}  control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>


                                            </FormControl>


                                        </CardContent>
                                    </Card>
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