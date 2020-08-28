import React , {useEffect}  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { useState } from 'react';
import { withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {  useLocation } from 'react-router-dom';
import Auth from '../../shared/auth';
import CapacidadeAtendimento from '../../components/CapacideAtedimento/CapacidadeAtendimento'
import Infraestrutura from '../../components/Infraestrutura/Infraestrutura'
import TableDadosDePessoal from '../../components/TableDadosDePessoal/TableDadosDePessoal'
import TableDadosDeEPIEPC from '../../components/TableDadosDeEPIEPC/TableDadosDeEPIEPC'
import TableDadosDeContratos from '../../components/TableDadosDeContratos/TableDadosDeContratos'
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from '@material-ui/core/Paper';
import {Alert, AlertTitle} from "@material-ui/lab";

import {bindActionCreators} from "redux";
import {Creators as UnidadeActions} from "../../redux/store/ducks/dadosUnidade";
import connect from "react-redux/es/connect/connect";

import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import ExibirMotivo from "../../components/ExibirMotivo";

import Button from "@material-ui/core/Button/Button";

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
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    cardStyleInfra : {
        minWidth: 275,
        minHeight: '16vw'
    },
    cardStyleCapacidade:{
        minWidth: 275,
        minHeight: '16vw'

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
    button: {
        margin: theme.spacing(1),
    },
}));


function EnhancedTable(props) {

    const {updateNome} = props;
    const classes = useStyles();
    const location = useLocation();
    let data = {};
    if (JSON.parse(Auth.getDetalhes())) {
        data = JSON.parse(Auth.getDetalhes());
    } else {
        data = location.state.detail;
    }
    const [dados, setDados] = useState(data);
    const [telaDetalhar, setTelaDetalhar] = useState(false);
    const isGexSr = Auth.isGexSr() === "false" ? false : true;
    const isPodeDecidir = Auth.isPodeDecidir() === "false" ? false : true;
    const isDesenv = Auth.isDesenv();

    const servidores = {

        servidores : [
            {
                servidores_siape: "12312312",
                servidores_nome: "Fulano de Tal",
                servidores_cargo: "FFF",
                servidores_lotacao: "21004090",
                servidores_ceab : "nao" ,
                servidores_ceap : "nao" ,
                servidores_pgsp : "nao" ,
                servidores_grupo_de_risco : "nao" ,
                servidores_lactante : "nao" ,
                servidores_idade_escolar : "nao" ,
                gestor : "nao" ,
            },
            {
                servidores_siape: "12121212",
                servidores_nome: "Guilherme de Tal",
                servidores_lotacao: "21004090",
                servidores_cargo: "FFF",
                servidores_ceab : "nao" ,
                servidores_ceap : "nao" ,
                servidores_pgsp : "nao" ,
                servidores_grupo_de_risco : "nao" ,
                servidores_lactante : "nao" ,
                servidores_idade_escolar : "sim" ,
                gestor : "sim" ,
            },
            {
                servidores_siape: "34343434",
                servidores_nome: "Siclana de Tal",
                servidores_lotacao: "21004090",
                servidores_cargo: "FFF",
                servidores_ceab : "sim" ,
                servidores_ceap : "nao" ,
                servidores_pgsp : "nao" ,
                servidores_grupo_de_risco : "sim" ,
                servidores_lactante : "sim" ,
                servidores_idade_escolar : "sim" ,
                gestor : "nao" ,
            }
        ]
    };


    useEffect(() => {
        updateNome(data.unidade  + ' - ' + data.unidade_nome);
    }, []);


    const handleClickDetalhar = async (e) => {
        setTelaDetalhar(true);

    };


    const handleClose = () => {

        setTelaDetalhar(false);

    };




    return (
        <React.Fragment>
            <CssBaseline />

            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                        <Grid item xs={12} md={4}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                                <StyledBreadcrumb
                                    color="primary"
                                    aria-current="page"
                                    component="p"
                                    label="Principal"
                                    icon={<HomeIcon fontSize="small"/>}
                                />
                            </Breadcrumbs>
                        </Grid>

                    </Grid>
                 </Grid>

                <Alert severity="info">
                    <AlertTitle>Gestores</AlertTitle>
                    <p>Gestor, o primeiro passo é acessar as abas de validação no menu ao lado para incluir/alterar
                        e ratificar os dados informados de pessoal, infraestrutura, EPI/EPC e contratos essenciais.</p>
                </Alert>
                <Grid item xs={12}>

                    <Grid container spacing={3}
                          alignItems="center"
                          justify="center">

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5"  color="primary" >
                                    {dados.unidade} - {dados.unidade_nome}

                                </Typography>
                            </Paper>
                        </Grid>

                    </Grid>

                </Grid>






                <Divider />

                <Grid item xs={12}  md={6}>
                    <Typography variant="h5" color='primary'>
                       Situacao : {dados.status}
                    </Typography>

                </Grid>


                <Grid item xs={12}  md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color='primary' display='inline'>
                                Decisão automática:
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            {
                                (dados.modificacao.decisao.length > 0
                                    && (isGexSr || isDesenv || isPodeDecidir))  ? (

                                        <>


                                                <Typography variant="h6" color='primary' display='inline'>
                                                    &nbsp; Não  &nbsp;
                                                </Typography>
                                                <Button display='inline'

                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        className={classes.button}
                                                        onClick={(e)=>{ handleClickDetalhar(e)}}

                                                        startIcon={<FindInPageOutlinedIcon />}
                                                >
                                                    Detalhar
                                                </Button>



                                        </>


                                    ) :
                                    (
                                        <Typography variant="h6" color='primary' display='inline'>
                                            &nbsp; Sim
                                        </Typography>

                                    )
                            }
                        </Grid>

                    </Grid>
                </Grid>


                <CapacidadeAtendimento classes={classes} {...dados}/>
                <Infraestrutura classes={classes} {...dados}/>
                <TableDadosDePessoal classes={classes} {...dados} />
                <TableDadosDeEPIEPC classes={classes} {...dados} />
                <TableDadosDeContratos classes={classes} {...dados} />


                { telaDetalhar && (

                    <ExibirMotivo dados={dados.modificacao.decisao[0]}  open={telaDetalhar} close={handleClose}/>

                )}

            </Grid>

        </React.Fragment>
    );
}


const mapStateToProps = state => ({
    dadosUnidade: state.dadosUnidade
})

const mapDispacthToProps = dispatch => bindActionCreators(UnidadeActions,dispatch);


export default connect(mapStateToProps,mapDispacthToProps)(EnhancedTable);
