import React, {useState, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import api from '../../services/api';
import Auth from '../../shared/auth';
import {useSnackbar} from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Grid from "@material-ui/core/Grid/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs/Breadcrumbs";
import NavigateNextIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Chip from "@material-ui/core/Chip/Chip";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Creators as UnidadeActions} from "../../redux/store/ducks/dadosUnidade";
import {Alert, AlertTitle} from "@material-ui/lab";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import TextLabels from "../../theme/textLabels";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import Box from "@material-ui/core/Box/Box";


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
        flexGrow: 1,
        width: '100%',
    },
    title: {
        marginTop: 30,
        marginBottom: 30
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
        marginTop: 30
    },
    select: {
        backgroundColor: '#fff'
    },
    divButton: {
        width: '100%',
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1),
    },
    loading: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
}));


function HistoricoExclusao(props) {

    const {updateNome} = props;
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState(false);

    const dadosTabela = [];
    useEffect(() => {
        updateNome('');
        setLoading(true);
        const unidades = JSON.parse(Auth.getOls());
        const lista = [];

        unidades.forEach(unidade => {
            lista.push(unidade.ol);
        });

        const data = {
            unidades: lista,
            tipoRelatorio: "HistoricoExclusao"
        };

        const token = Auth.getToken();

        api.post('relatorio', data, {
            headers: {"Authorization": "Bearer " + token}
        }).then(response => {

            setLoading(false);

            for(let indice in response.data.dados) {
                const un = response.data.dados[indice];

                dadosTabela.push([
                    un.dados.unidade,
                    un.dados.siape,
                    un.dados.nome,
                    un.siape,
                    un.dados.motivo,
                    new Date(un.data_alteracao).toLocaleString('pt-BR')
                ]);

            }

            setDados(dadosTabela);




        }).catch(e => {

            setLoading(false);
            enqueueSnackbar('Erro ao carregar dados!', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        });

    }, []);


   const options = {
        filterType: 'checkbox',
        textLabels : TextLabels,
        responsive: 'scroll',
        fixedHeader: true,
        tableBodyHeight: '100%',
        customToolbarSelect: () => {}

    };
    const columns = ["Unidade","Siape",  {
        name: "Nome",
        options: {


            customBodyRender: (value) => {

                return (
                    <Box style={{
                        width: '300px'
                    }}>
                        {value}
                    </Box>
                );
            }
        }}, "Gestor",   {
        name: "Motivo",
        options: {


            customBodyRender: (value) => {

                return (
                    <Box style={{
                        width: '400px'
                    }}>
                        {value}
                    </Box>
                );
            }
        }}, "Data" ];

    return (
        <React.Fragment>
            <CssBaseline/>
            {
                !dados ? (
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : (
                    <>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={4}>
                                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                                        <StyledBreadcrumb
                                            color="primary"
                                            aria-current="page"
                                            component="p"
                                            label="Histórico de Exclusões"
                                            icon={<ListAltRoundedIcon fontSize="small"/>}
                                        />
                                    </Breadcrumbs>
                                </Grid>

                            </Grid>
                            <br/>
                        </Grid>


                        <Alert severity="info">
                            <AlertTitle>Gestores</AlertTitle>
                            <p>Prezado Gestor, esta aba é destinada a exibir o histórico de exclusão dos servidores.<br/>
                            Essa são é efetuada na aba de validação / pessoal</p>
                        </Alert>


                     <Grid container>


                            <Grid item xs={12}>
                                <br/>
                                <Typography variant="h5" color="primary">
                                    Histórico
                                </Typography>
                                <br/>
                            </Grid>


                            <Grid item xs={12}>
                                <MUIDataTable
                                    title={"Listagem"}
                                    data={dados}
                                    columns={columns}
                                    options={options}
                                />
                            </Grid>

                        </Grid>






                    </>


                )
            }

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>


        </React.Fragment>
    );
}


const mapStateToProps = state => ({
    dadosUnidade: state.dadosUnidade
})

const mapDispacthToProps = dispatch => bindActionCreators(UnidadeActions, dispatch);


export default connect(mapStateToProps, mapDispacthToProps)(HistoricoExclusao);
