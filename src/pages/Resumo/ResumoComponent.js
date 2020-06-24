import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../../shared/auth';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import PainelComponent from './PainelComponent';
import ResumoFactory from './models/ResumoFactory';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";
import Breadcrumbs from "@material-ui/core/Breadcrumbs/Breadcrumbs";
import NavigateNextIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {emphasize, withStyles} from '@material-ui/core/styles';

import Chip from "@material-ui/core/Chip/Chip";
import AssessmentIcon from '@material-ui/icons/Assessment';

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
	title: {
		marginTop: 30,
		marginBottom: 30
	}
}));

function ResumoComponent(){
    
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    function alerta(mensagem, variant){
        enqueueSnackbar(mensagem, {
            variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    }

    const [dados, setDados] = useState('');
    const [erro, setErro] = useState(false);

    useEffect(() => {

        const data = {
            unidades : ["01001"],
            tipoRelatorio: "TotalUnidades"   
        };

        const token = Auth.getToken();

        api.post('relatorio', data, {
            headers: {"Authorization" : "Bearer " + token }
        }).then(response => {

            try{

                if(!response.data.dados){
                    const error = new Error("Consulta não retornou dados!")
                    error.mensagemParaUsuario = true;
                    throw error;
                }

                const resumo = ResumoFactory.dosDados(response.data.dados);

                if(!resumo.contemAlgo){
                    const erro = new Error("Dados da consulta não retornou nenhum valor");
                    erro.mensagemParaUsuario = true;
                    throw erro;
                }
                
                if(resumo.mensagemAlerta){
                    alerta(resumo.mensagemAlerta, 'warning');
                }
                
                setDados(resumo);
                    
            }catch(e){
                if(erro.mensagemParaUsuario){
                    setErro(e.message);
                }else{
                    console.error(e);
                    setErro('Erro desconhecido: ' + e.message);
                }
            }

        }).catch(e => {
            
            let mensagem = '';

            if(e.response && e.response.data && e.response.data.message){
                mensagem = e.response.data.message;
            }else{
                mensagem = 'Erro na conexão!';
            }
            alerta(mensagem, 'error');
            setErro(mensagem);

        });

    }, []);

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
                                label="Painel - INSS Brasil"
                                icon={<AssessmentIcon fontSize="small"/>}
                            />
                        </Breadcrumbs>
                        <br/>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" color='primary'>
                    Painel -  INSS BRASIL
                </Typography>
                <Divider/>
            </Grid>
            <br/>

            <Grid container>


            {
            erro ? (
                <div>Erro:{erro}</div>
            ) : !dados ? (
                <div>carregando...</div>
            ) : (
                <PainelComponent dados={dados}></PainelComponent>
            )}
            </Grid>
        </React.Fragment>
    );
}

export default ResumoComponent;