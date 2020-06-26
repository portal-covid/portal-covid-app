import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {emphasize, makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ScannerIcon from '@material-ui/icons/Scanner';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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
        soma_metragem_administrativo: 0,
        soma_metragem_perito: 0,
        soma_guiches: 0,
        soma_salas_assistente: 0,
        soma_salas_peritos: 0,
        soma_scanners: 0
    };
    for (let unidade in props) {
        const objeto = props[unidade].infraestrutura;
        dados.soma_metragem_administrativo += parseInt(objeto.metragem_administrativo);
        dados.soma_metragem_perito += parseInt(objeto.metragem_pericia_medica);
        dados.soma_guiches += objeto.qtd_guiches;
        dados.soma_salas_assistente += objeto.qtd_salas_ass;
        dados.soma_salas_peritos += objeto.salas_pericia;
        dados.soma_scanners+= objeto.qtd_scanner;
    }

    return (
        <React.Fragment>
            <Grid className={classes.root} item xs={12} md={12} >
                <Typography variant="h5" color='primary'>
                    Infraestrutura
                </Typography>
                <br/>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={2}>
                        <Paper  style={{backgroundColor:"#48CBEB"}} className={classes.paper} variant="outlined"  elevation={9}>

                            <Typography className={classes.typography} variant="h4">
                                <OpenWithIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_metragem_administrativo} m²
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Área Administrativo
                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Paper style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>

                            <Typography className={classes.typography} variant="h4">
                                <OpenWithIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_metragem_perito} m²
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Área Perícia Médica
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Paper  style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>
                            <Typography className={classes.typography} variant="h4">
                                <AssignmentIndIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_guiches}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Guichês administrativo
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Paper style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>

                            <Typography className={classes.typography} variant="h4">
                                <AssignmentIndIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_salas_assistente}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Salas assistente social
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Paper  style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>
                            <Typography className={classes.typography} variant="h4">
                                <AssignmentIndIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_salas_peritos}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Consultórios
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Paper  style={{backgroundColor:"#40E0D0"}} className={classes.paper} variant="outlined"  elevation={9}>
                            <Typography className={classes.typography} variant="h4">
                                <ScannerIcon/>
                            </Typography>
                            <Typography className={classes.typography} variant="h2">
                                {dados.soma_scanners}
                            </Typography>
                            <Typography className={classes.typography} variant="h6">
                                Scanners
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
            </Grid>
        </React.Fragment>
    )
}