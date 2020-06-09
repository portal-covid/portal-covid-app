import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const formData = {
    admTotal: '',
    admMotivoLegal: '',
    admGrupoRisco: '',
    admCEAP: '',
    admCEAB: '',
    peritosTotal: '',
    peritosMotivoLegal: '',
    peritosGrupoRisco: '',
    assistenteTotal: '',
    assistenteMotivoLegal: '',
    assistenteGrupoRisco: '',
    estagiariosTotal: '',
    estagiariosMotivoLegal: '',
    estagiariosGrupoRisco: '',
    temporariosTotal: '',
    temporariosMotivoLegal: '',
    temporariosGrupoRisco: '',
}

export default function Pessoal() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [form, setForm] = useState(formData);

    const handleInputChange = (event) => {
        setForm({...form,
          [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await api.post('dados', JSON.stringify(form)).then(response => {
                enqueueSnackbar('Dados salvos com sucesso!', { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
                history.push('/home');
            });
        } catch(error) {
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
            <form onSubmit={handleSubmit} className={classes.root}>
                <Grid container className={classes.root} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Administrativo
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Total
                            </Typography>
                            <TextField id="total-adm" 
                                value={form.admTotal}
                                name="admTotal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-adm" 
                                value={form.admMotivoLegal} 
                                name="admMotivoLegal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-adm" 
                                value={form.admGrupoRisco}
                                name="admGrupoRisco"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                CEAP
                            </Typography>
                            <TextField id="ceap-adm" 
                                value={form.admCEAP}
                                name="admCEAP"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                CEAB
                            </Typography>
                            <TextField id="ceab-adm" 
                                value={form.admCEAB}
                                name="admCEAB"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                
                <Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Peritos
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Total
                            </Typography>
                            <TextField id="total-perito" 
                                value={form.peritosTotal}
                                name="peritosTotal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-perito"
                                value={form.peritosMotivoLegal}
                                name="peritosMotivoLegal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-perito"
                                value={form.peritosGrupoRisco}
                                name="peritosGrupoRisco"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Assistente Social
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Total
                            </Typography>
                            <TextField id="total-social"
                                value={form.assistenteTotal}
                                name="assistenteTotal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-social"
                                value={form.assistenteMotivoLegal}
                                name="assistenteMotivoLegal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-social"
                                value={form.assistenteGrupoRisco}
                                name="assistenteGrupoRisco"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Estagiários
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Total
                            </Typography>
                            <TextField id="total-estagiario"
                                value={form.estagiariosTotal}
                                name="estagiariosTotal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-estagiario"
                                value={form.estagiariosMotivoLegal}
                                name="estagiariosMotivoLegal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-estagiario"
                                value={form.estagiariosGrupoRisco}
                                name="estagiariosGrupoRisco"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Temporários
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Total
                            </Typography>
                            <TextField id="total-temporario"
                                value={form.temporariosTotal}
                                name="temporariosTotal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-temporario"
                                value={form.temporariosMotivoLegal}
                                name="temporariosMotivoLegal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afast. Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-temporario"
                                value={form.temporariosGrupoRisco}
                                name="temporariosGrupoRisco"
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
            </form>
        </React.Fragment>
    );
}