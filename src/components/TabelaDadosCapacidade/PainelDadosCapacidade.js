import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {emphasize, makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import StoreIcon from '@material-ui/icons/Store';

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

export default function PainelDadosCapacidade(props) {
    const classes = useStyles();

    const dados = {
        soma_servidores: 0,
        soma_atendimento: 0,
        soma_faixa_horario: 0
    };
    for (let unidade in props) {
        const objeto = props[unidade].capacidade_de_atendimento[0];
        dados.soma_servidores += objeto.servidores_retorno + objeto.assistente + objeto.peritos;
        dados.soma_atendimento += objeto.administrativo_vagas_hora + objeto.assistentes_vagas_hora + objeto.pericia_vagas_hora_maximo;
        dados.soma_faixa_horario += objeto.administrativo_vagas_dia + objeto.assistentes_vagas_dia + objeto.pericia_vagas_dia;
    }

    return (
        <React.Fragment>
            <Grid className={classes.root} item xs={12} md={12} >
                <Typography variant="h5" color='primary'>
                    Capacidade de Atendimento
                </Typography>
                <br/>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <Paper  style={{backgroundColor:"#48CBEB"}} className={classes.paper} variant="outlined"  elevation={9}>

                            <Typography className={classes.typography} variant="h4">
                                <AssignmentIndIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_servidores}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Total de Servidores
                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>

                            <Typography className={classes.typography} variant="h4">
                                <StoreIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_atendimento}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Total de Atendimentos
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper  style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>
                            <Typography className={classes.typography} variant="h4">
                                <QueryBuilderIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_faixa_horario}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Total de Segurados por faixa de horário
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
                <br/>
            </Grid>
        </React.Fragment>
    )
}