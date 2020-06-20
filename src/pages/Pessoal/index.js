import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

export default function Pessoal() {
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
        servidores_total: data['pessoal']['administrativo']['total'],
        servidores_afastamentos_legais: data['pessoal']['administrativo']['afastado_motivo_legal'],
        servidores_grupo_de_risco: data['pessoal']['administrativo']['grupo_de_risco'],
        servidores_ceab: data['pessoal']['administrativo']['ceab'],
        servidores_programa_gestao: data['pessoal']['administrativo']['programa_gestao'],
        servidores_gestores: data['pessoal']['administrativo']['gestores'],
        pericia_medica_total: data['pessoal']['pericia_medica']['total'],
        pericia_medica_afastado_motivo_legal: data['pessoal']['pericia_medica']['afastado_motivo_legal'],
        pericia_grupo_de_risco: data['pessoal']['pericia_medica']['grupo_de_risco'],
        assistentes_total: data['pessoal']['assistentes']['total'],
        assistentes_afastado_motivo_legal: data['pessoal']['assistentes']['afastado_motivo_legal'],
        assistentes_grupo_de_risco: data['pessoal']['assistentes']['grupo_de_risco'],
        estagiarios_total: data['pessoal']['estagiarios']['total'],
        estagiarios_afastado_motivo_legal: data['pessoal']['estagiarios']['afastado_motivo_legal'],
        estagiarios_grupo_de_risco: data['pessoal']['estagiarios']['grupo_de_risco'],
        temporarios_total: data['pessoal']['temporarios']['total'],
        temporarios_afastado_motivo_legal: data['pessoal']['temporarios']['afastado_motivo_legal'],
        temporarios_grupo_de_risco: data['pessoal']['temporarios']['grupo_de_risco'],
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
			tipoOperacao: "AtualizarDadosDePessoal",
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
                <p>Prezado Gestor, esta aba é destinada a demonstrar a compilação do número de pessoal da sua unidade. É possível clicar em alterar dados, para validarmos a situação real das unidades de atendimento.</p>
            </Alert>

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
                                Total de Servidores da unidade
                            </Typography>
                            <TextField id="total-adm" 
                                value={form.servidores_total}
                                name="servidores_total"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-adm" 
                                value={form.servidores_afastamentos_legais} 
                                name="servidores_afastamentos_legais"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Grupo de Risco
                            </Typography>
                            <TextField id="programa-adm"
                                value={form.servidores_grupo_de_risco}
                                name="servidores_grupo_de_risco"
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
                                value={form.servidores_ceab}
                                name="servidores_ceab"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Programa de Gestão/Teletrabalho
                            </Typography>
                            <TextField id="servidores-programa-gestao-adm"
                                value={form.servidores_programa_gestao}
                                name="servidores_programa_gestao"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Gestores
                            </Typography>
                            <TextField id="servidores-gestores-adm"
                                value={form.servidores_gestores}
                                name="servidores_gestores"
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
                                Total de Servidores da unidade
                            </Typography>
                            <TextField id="total-perito" 
                                value={form.pericia_medica_total}
                                name="pericia_medica_total"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-perito"
                                value={form.pericia_medica_afastado_motivo_legal}
                                name="pericia_medica_afastado_motivo_legal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-perito"
                                value={form.pericia_grupo_de_risco}
                                name="pericia_grupo_de_risco"
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
                                Total de Servidores da unidade
                            </Typography>
                            <TextField id="total-social"
                                value={form.assistentes_total}
                                name="assistentes_total"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-social"
                                value={form.assistentes_afastado_motivo_legal}
                                name="assistentes_afastado_motivo_legal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-social"
                                value={form.assistentes_grupo_de_risco}
                                name="assistentes_grupo_de_risco"
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
                                Total de estagiários da unidade
                            </Typography>
                            <TextField id="total-estagiario"
                                value={form.estagiarios_total}
                                name="estagiarios_total"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-estagiario"
                                value={form.estagiarios_afastado_motivo_legal}
                                name="estagiarios_afastado_motivo_legal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-estagiario"
                                value={form.estagiarios_grupo_de_risco}
                                name="estagiarios_grupo_de_risco"
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
                                Total de temporários da unidade
                            </Typography>
                            <TextField id="total-temporario"
                                value={form.temporarios_total}
                                name="temporarios_total"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Motivo Legal
                            </Typography>
                            <TextField id="motivo-legal-temporario"
                                value={form.temporarios_afastado_motivo_legal}
                                name="temporarios_afastado_motivo_legal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Afastamento Grupo de Risco
                            </Typography>
                            <TextField id="grupo-risco-temporario"
                                value={form.temporarios_grupo_de_risco}
                                name="temporarios_grupo_de_risco"
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