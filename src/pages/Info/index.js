import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { useState } from 'react';
import {emphasize, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {  useLocation } from 'react-router-dom';

import CapacidadeAtendimento from '../../components/CapacideAtedimento/CapacidadeAtendimento'
import Infraestrutura from '../../components/Infraestrutura/Infraestrutura'
import TableDadosDePessoal from '../../components/TableDadosDePessoal/TableDadosDePessoal'
import TableDadosDeEPIEPC from '../../components/TableDadosDeEPIEPC/TableDadosDeEPIEPC'
import TableDadosDeContratos from '../../components/TableDadosDeContratos/TableDadosDeContratos'
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from '@material-ui/core/Paper';

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    cardStyleInfra : {
        minWidth: 275,
        minHeight: '13vw'
    },
    cardStyleCapacidade:{
        minWidth: 275,
        minHeight: '14vw'

    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

function handleClick(event) {
    event.preventDefault();

}



export default function EnhancedTable() {
    const classes = useStyles();
    const location = useLocation();
    const [dados, setDados] = useState(location.state.detail);

    return (
        <React.Fragment>


            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                        <Grid item xs={12} md={4}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                                <StyledBreadcrumb
                                    color="textPrimary"
                                    aria-current="principal"
                                    component="a"
                                    href="#"
                                    label="Principal"
                                    icon={<HomeIcon fontSize="small"/>}
                                    onClick={handleClick}
                                />
                            </Breadcrumbs>
                        </Grid>

                    </Grid>
                 </Grid>
                <Grid item xs={12}>

                    <Grid container spacing={3}>

                        <Grid item xs={12}
                              alignItems="center"
                              justify="center"
                        >
                            <Paper className={classes.paper}>
                                <Typography>
                                    <h2>{dados.unidade} - {dados.unidade_nome}</h2>
                                </Typography>
                            </Paper>
                        </Grid>

                    </Grid>




                </Grid>



                <Divider />


                <CapacidadeAtendimento classes={classes} {...dados}/>
                <Infraestrutura classes={classes} {...dados}/>
                <TableDadosDePessoal classes={classes} {...dados} />
                <TableDadosDeEPIEPC classes={classes} {...dados} />
                <TableDadosDeContratos classes={classes} {...dados} />

            </Grid>

        </React.Fragment>
    );
}
