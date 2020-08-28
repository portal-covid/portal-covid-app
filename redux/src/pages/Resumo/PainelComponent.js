import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";

import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import DomainDisabledRoundedIcon from '@material-ui/icons/DomainDisabledRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';


import TableDadosDePessoal from "../../components/TableDadosDePessoal/TableDadosDePessoal";
import TableDadosDeSituacaoAps from "../../components/TableDadosDeSituacaoAps/TableDadosDeSituacaoAps";

import TableDadosCapacidade from "../../components/TabelaDadosCapacidade/TabelaDadosCapacidade";
import PainelDadosCapacidade from "../../components/TabelaDadosCapacidade/PainelDadosCapacidade";
import PainelDadosInfra from "../../components/TabelaDadosCapacidade/PainelDadosInfra";
import TableDadosInfra from "../../components/TabelaDadosCapacidade/TabelaDadosInfra";
import TableDadosModificacoes from "../../components/TableDadosModificacoes/TableDadosModificacoes";

import DialogApsFechada from "../../components/DialogApsFechada"
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        minHeight: '10vw'
    },
    typography:{
        color: theme.palette.info.contrastText
    }
}));


function PainelComponent({dados}){

    const dadosDePessoal = {
        pessoal : {
            administrativo: {
                total : dados.servidoresPorTipo.admnistrativo,
                grupo_de_risco :dados.servidoresPorGrupoRisco.admnistrativo,
                afastado_motivo_legal : dados.servidoresPorTipoLicenca.admnistrativo,
                ceab : dados.servidoresPorTipo.admnistrativo_ceab,
                programa_gestao : dados.servidoresPorTipo.admnistrativo_programa_gestao,
                gestores : dados.servidoresPorTipo.admnistrativo_gestores,
                gerente_de_aps_grupo_de_risco : dados.servidoresPorTipo.admnistrativo_gerente_de_aps_grupo_de_risco,
                retorno : parseInt(dados.servidoresPorTipo.admnistrativo) - (
                    parseInt(dados.servidoresPorGrupoRisco.admnistrativo)
                            + parseInt(dados.servidoresPorTipoLicenca.admnistrativo)
                            + parseInt(dados.servidoresPorTipo.admnistrativo_ceab)
                            + parseInt(dados.servidoresPorTipo.admnistrativo_programa_gestao)
                            + parseInt(dados.servidoresPorTipo.admnistrativo_gerente_de_aps_grupo_de_risco))
            },
            pericia_medica:{
                total :dados.servidoresPorTipo.perito,
                grupo_de_risco : dados.servidoresPorGrupoRisco.perito,
                afastado_motivo_legal : dados.servidoresPorTipoLicenca.perito,
                retorno : (dados.servidoresPorTipo.perito - dados.servidoresPorGrupoRisco.perito - dados.servidoresPorTipoLicenca.perito)
            },
            assistentes:{
                total :dados.servidoresPorTipo.assistente,
                grupo_de_risco : dados.servidoresPorGrupoRisco.assistente,
                afastado_motivo_legal : dados.servidoresPorTipoLicenca.assistente,
                retorno : (dados.servidoresPorTipo.assistente - dados.servidoresPorGrupoRisco.assistente - dados.servidoresPorTipoLicenca.assistente)
            },
            estagiarios:{
                total :dados.servidoresPorTipo.estagiarios,
                grupo_de_risco : dados.servidoresPorGrupoRisco.estagiarios,
                afastado_motivo_legal : dados.servidoresPorTipoLicenca.estagiarios,
                retorno : (dados.servidoresPorTipo.estagiarios - dados.servidoresPorGrupoRisco.estagiarios - dados.servidoresPorTipoLicenca.estagiarios)
            },
            temporarios:{
                total :dados.servidoresPorTipo.temporarios,
                grupo_de_risco : dados.servidoresPorGrupoRisco.temporarios,
                afastado_motivo_legal : dados.servidoresPorTipoLicenca.temporarios,
                retorno : (dados.servidoresPorTipo.temporarios - dados.servidoresPorGrupoRisco.temporarios - dados.servidoresPorTipoLicenca.temporarios)
            },

        }
    };


    const classes = useStyles();


    return (
        <React.Fragment>



            <Grid className={classes.root} item xs={12} md={12} >
                <Typography variant="h5" color='primary'>
                    Hoje
                </Typography>
                <br/>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <Paper  style={{backgroundColor:"#48CBEB"}} className={classes.paper} variant="outlined"  elevation={9}>


                            <Typography className={classes.typography} variant="h4">
                                <AccountBalanceRoundedIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.agencias}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Total de agências
                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>

                            <Typography className={classes.typography} variant="h4">
                                <BusinessRoundedIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.agenciasAbertas || 0}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                <DialogApsFechada {...dados.recursosUnidades} titulo={'Agências Abertas'} tipoStatus={'Abre'}/>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>

                            <Paper  style={{backgroundColor:"#F08080"}} className={classes.paper} variant="outlined"  elevation={9}>
                                <Typography className={classes.typography} variant="h4">
                                    <DomainDisabledRoundedIcon/>
                                </Typography>
                                <Typography className={classes.typography} variant="h2">
                                    {dados.agenciasFechadas || 0}
                                </Typography>
                                <DialogApsFechada {...dados.recursosUnidades} titulo={'Agências Fechadas'} tipoStatus={'Não Abre'}/>
                            </Paper>


                    </Grid>

                </Grid>
                <br/>
            </Grid>

            <TableDadosDePessoal {...dadosDePessoal} />


            <PainelDadosCapacidade {...dados.recursosUnidades} />

         <TableDadosCapacidade {...dados.recursosUnidades} />

          <PainelDadosInfra {...dados.recursosUnidades} />

            <TableDadosInfra {...dados.recursosUnidades} />

            <TableDadosModificacoes {...dados.recursosUnidades} />

            <TableDadosDeSituacaoAps {...dados} />

        </React.Fragment>
    );
}

export default PainelComponent;