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
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import List from "@material-ui/core/List/List";


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

export default function Epi() {
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
                <p>Prezado Gestor, esta aba é destinada a demonstrar a compilação dos dados referentes aos contratos da sua unidade. Para alterações, informe os novos valor desejado e clique em SALVAR.</p>
            </Alert>
            <form onSubmit={handleSubmit} className={classes.root}>


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={3} >
                            <Grid container className={classes.root}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color='primary'>
                                        Contratos
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>


                                    <List>


                                        <ListItem>
                                            <ListItemText primary="Limpeza e conservação:"/>
                                            <ListItemSecondaryAction>
                                                <RadioGroup  row
                                                             aria-label="Limpeza e conservação"
                                                             name="limpeza_conservacao"
                                                             value={form.limpeza_conservacao}
                                                             onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica" control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>
                                            </ListItemSecondaryAction>

                                        </ListItem>


                                        <ListItem>
                                            <ListItemText primary="Vigilância ostensiva:"/>
                                            <ListItemSecondaryAction>
                                                <RadioGroup  row
                                                             aria-label="Limpeza e conservação"
                                                             name="vigilancia_ostensiva"
                                                             value={form.vigilancia_ostensiva}
                                                             onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica" control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>
                                            </ListItemSecondaryAction>

                                        </ListItem>



                                        <ListItem>
                                            <ListItemText primary="Vigilância eletrônica:"/>
                                            <ListItemSecondaryAction>
                                                <RadioGroup  row
                                                             aria-label="Limpeza e conservação"
                                                             name="vigilancia_eletronica"
                                                             value={form.vigilancia_eletronica}
                                                             onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica" control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>
                                            </ListItemSecondaryAction>

                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Manutenção predial:"/>
                                            <ListItemSecondaryAction>
                                                <RadioGroup  row
                                                             aria-label="Manutenção predial"
                                                             name="manutencao_predial"
                                                             value={form.manutencao_predial}
                                                             onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica" control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>
                                            </ListItemSecondaryAction>

                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Manutenção ar condicionado:"/>
                                            <ListItemSecondaryAction>
                                                <RadioGroup  row
                                                             aria-label="Manutenção ar condicionado"
                                                             name="manutencao_ar_condicionado"
                                                             value={form.manutencao_ar_condicionado}
                                                             onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica" control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>
                                            </ListItemSecondaryAction>

                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Manutenção de elevadores:"/>
                                            <ListItemSecondaryAction>
                                                <RadioGroup  row
                                                             aria-label="Manutenção de elevadores"
                                                             name="manutencao_elevadores"
                                                             value={form.manutencao_elevadores}
                                                             onChange={handleInputChange}>
                                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                                    <FormControlLabel value="nao" control={<Radio />} label="Não" />
                                                    <FormControlLabel value="nao se aplica" control={<Radio />} label="Não se aplica" />
                                                </RadioGroup>
                                            </ListItemSecondaryAction>

                                        </ListItem>



                                    </List>



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