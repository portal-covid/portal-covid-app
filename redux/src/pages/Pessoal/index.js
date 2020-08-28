import React, {useState, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useSnackbar} from 'notistack';
import Auth from '../../shared/auth';
import {useHistory, useLocation} from 'react-router-dom';
import {Alert, AlertTitle} from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import NavigateNextIcon from "@material-ui/core/SvgIcon/SvgIcon";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import CheckIcon from '@material-ui/icons/Check';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {bindActionCreators} from "redux";
import {Creators as UnidadeActions} from "../../redux/store/ducks/dadosUnidade";
import connect from "react-redux/es/connect/connect";
import api from "../../services/api";
import MUIDataTable from "mui-datatables";
import {green, red} from "@material-ui/core/colors";
import Link from "@material-ui/core/Link/Link";
import Button from "@material-ui/core/Button/Button";
import TextLabels from "../../theme/textLabels";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import Dica from "../../components/Dica";
import TextField from "@material-ui/core/TextField/TextField";

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
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
        margin: {
            margin: theme.spacing(1),
        },
    },
    loading: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#000',
    }
    ,
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));


function Pessoal(props) {
    const {updateNome} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState([]);

    const [exibirTelaExclusao, setExibirTelaExclusao] = useState(false);
    const [exibirTelaEdicao, setExibirTelaEdicao] = useState(false);
    const [exibirTelaCadastro, setExibirTelaCadastro] = useState(false);

    const [indice, setIndice] = useState('');
    let history = useHistory();

    const [formulario, setFormulario] = useState({ motivo: ''});
    const [formularioNome, setFormularioNome] = useState({ nome: ''});

    const handleClickExcluir = async (e,dataIndex) => {
        setIndice(dataIndex);
        setExibirTelaExclusao(true);
    };

    const handleClickEditarNome = async (e,dataIndex) => {
        setIndice(dataIndex);

        setFormularioNome({...formularioNome,
            ['nome']: dados[dataIndex][2]
        });

        setExibirTelaEdicao(true);
    };

    const handleInputEdicao = (event) => {

        setFormularioNome({...formularioNome,
            [event.target.name]: event.target.value
        });
    };

    const handleClickCadastrar = async (e,dataIndex) => {
        setExibirTelaCadastro(true);
    };

    const handleInputChangeExclusao = (event) => {
        event.preventDefault();

        setFormulario({...formulario,
            [event.target.name]: event.target.value
        });
    };

    const excluirServidor = async (event) => {

        event.preventDefault();

        if(!formulario.motivo.length){
            enqueueSnackbar('Justificativa deve ser preenchida!  ' , {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            return false
        }

        setExibirTelaExclusao(false);
        setLoading(true);



        const resp = {
            _id: dados[indice][4] ,
            tipoOperacao: "RemoverServidorDaUnidade",
        };


        resp['dados'] = {
            motivo: formulario.motivo,
            unidade: dados[indice][4],
            siape: dados[indice][1],
            nome: dados[indice][2],
            id: dados[indice][1] + dados[indice][4],
            valores : dados[indice]
        };


        try {
            await api.post('unidades', resp, {
                headers: {"Authorization" : "Bearer " + Auth.getToken() }
            }).then(response => {


                if(response.data.ok){

                    const copia = dados.slice();
                    copia.splice(indice,1);
                    setDados(copia);

                    setLoading(false);

                    enqueueSnackbar('Usuário removido com sucesso!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }else{

                    setLoading(false);
                    enqueueSnackbar('Erro ao salvar os dados! - ' + response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }
            });
        } catch(error) {

            setLoading(false);
            let mensagem = error.toString();

            if(mensagem === "Error: Request failed with status code 401"){
                mensagem = 'Sessão expirada - Refazer login'
            }

            enqueueSnackbar('Erro ao remover usuário!  ' + mensagem, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

            Auth.logout();
            history.push('/');

        }


    };

    const alterarNome = async (event) => {

        event.preventDefault();

        if(!formularioNome.nome.length){
            enqueueSnackbar('Nome deve ser preenchido!  ' , {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            return false
        }

        setExibirTelaEdicao(false);
        setLoading(true);

        const resp = {
            _id: dados[indice][4] ,
            tipoOperacao: "AtualizarNomeServidorDaUnidade",
        };


        resp['dados'] = {
            motivo: 'atualização de nome',
            unidade: dados[indice][4],
            siape: dados[indice][1],
            nome: formularioNome.nome,
            id: dados[indice][1] + dados[indice][4],
            valores : dados[indice]
        };


        try {
            await api.post('unidades', resp, {
                headers: {"Authorization" : "Bearer " + Auth.getToken() }
            }).then(response => {


                if(response.data.ok){

                    const copia = dados.slice();
                    copia[indice][2] = formularioNome.nome;
                    setDados(copia);
                    setLoading(false);

                    enqueueSnackbar('Nome alterado com sucesso!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }else{

                    setLoading(false);
                    enqueueSnackbar('Erro ao salvar os dados! - ' + response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }
            });
        } catch(error) {

            setLoading(false);
            let mensagem = error.toString();

            if(mensagem === "Error: Request failed with status code 401"){
                mensagem = 'Sessão expirada - Refazer login'
            }

            enqueueSnackbar('Erro ao salvar dados !  ' + mensagem, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

            Auth.logout();
            history.push('/');

        }


    };

    const handleClose = () => {
        setIndice('');
        setExibirTelaExclusao(false);
        setExibirTelaEdicao(false);
        setExibirTelaCadastro(false);
    };

    let data = {};

    if (JSON.parse(Auth.getDetalhes())) {
        data = JSON.parse(Auth.getDetalhes());
    } else {
        data = location.state.detail;
    }

    const [aps, setAPS] = useState({unidade: data.unidade, unidade_nome: data.unidade_nome});


    useEffect(() => {
        updateNome(aps.unidade + ' - ' + aps.unidade_nome);
    }, [aps]);



    useEffect(() => {

        setLoading(true);

        const data = {
            unidades: [aps.unidade],
            tipoRelatorio: "ServidoresDaUnidade"
        };

        const token = Auth.getToken();

        api.post('relatorio', data, {
            headers: {"Authorization": "Bearer " + token}
        }).then(response => {


            if (!response.data.dados) {
                setLoading(false);
                return;
            }

            const dataTabela = [];

            for (let s in response.data.dados){


                const servidor = response.data.dados[s];
                const motivo = [];



                if(servidor.ceab === "sim"){
                    motivo.push('CEAB')
                }

                if(servidor.ceap === "sim"){
                    motivo.push('CEAP')
                }

                if(servidor.pgsp === "sim"){
                    motivo.push('PGSP')
                }

                if(servidor.grupo_de_risco.length > 0){
                    servidor.grupo_de_risco.forEach(function (item) {
                        motivo.push(item)
                    })
                }


                dataTabela.push([
                    servidor.retorna ,
                    servidor.siape,
                    servidor.nome,
                    servidor.area_de_atuacao.toUpperCase(),
                    servidor.lotacao,
                    servidor.nome_unidade.replace( 'AGÊNCIA DA PREVIDÊNCIA SOCIAL', 'APS '),
                    servidor.gex,
                    servidor.sr,
                    servidor.ceab,
                    servidor.ceap,
                    servidor.pgsp,
                    servidor.grupo_de_risco.length > 0 ? 'X' : '',
                    servidor.afastamento_legal === 'sim' ? 'X' : '',
                    motivo,
                    new Date(servidor.data_alteracao).toLocaleString('pt-BR')
                ]);


            }

            setDados(dataTabela);
            setLoading(false);

        }).catch(e => {

            setLoading(false);
            enqueueSnackbar('Erro ao carregar dados!', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            Auth.logout();
            history.push('/');
        });

    }, []);

    const columns = [

        {
            name: "Retorna",
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value) => {
                    if (value === "sim")
                        return (
                            <CheckIcon style={{ color: green[500] }}/>
                        );
                    else
                        return (
                            <ClearSharpIcon style={{ color: red[500] }}/>
                        );
                }

            }},
        {
            name: "Siape",
            options: {
                filter: false,
                sort:false,
                searchable: false,

                customBodyRender: (value,dataIndex) => {

                    return (
                        <React.Fragment>

                            {

                                <Link href="#"  onClick={(e)=>{ handleClickCadastrar(e,dataIndex.rowIndex)}}>
                                    {value}
                                </Link>

                            }


                        </React.Fragment>
                    );
                }
            }},    {
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
            }},"Área de Atuação", "Lotação",
        {
            name: "Unidade",
            options: {


                customBodyRender: (value) => {

                    return (
                        <Box style={{
                            minWidth: '400px'
                        }}>
                            {value}
                        </Box>
                    );
                }
            }},"Gex","SR",

        {
            name: "CEAB",
            options: {


                customBodyRender: (value) => {

                    if (value === 'sim')
                        return (

                            <Box style={{ fontWeight : 'bold',fontSize:'16px' }}>

                                X
                            </Box>

                        );

                }
            }},

        {
            name: "CEAP",
            options: {


                customBodyRender: (value) => {

                    if (value === 'sim')
                        return (

                            <Box style={{ fontWeight : 'bold',fontSize:'16px' }}>

                                X
                            </Box>

                        );

                }
            }}
        ,
        {
            name: "PGSP",
            options: {


                customBodyRender: (value) => {

                    if (value === 'sim')
                        return (

                            <Box style={{ fontWeight : 'bold',fontSize:'16px' }}>

                               X
                            </Box>

                        );

                }
            }}
        ,


        {
            name: "Grupo de Risco",
            options: {


                customBodyRender: (value) => {

                    return (

                        <Box style={{ fontWeight : 'bold',fontSize:'16px' }}>

                            {value}
                        </Box>



                    );


                }
            }}
        ,
        "Afastamento legal",
        {
            name: "Motivos",
            options: {


                customBodyRender: (value,dataIndex) => {

                    let listItems = '';
                    if(value.length > 0){

                        listItems = value.map((d) => <li key={dataIndex.rowIndex + d}>{d}</li>);

                    }



                    return (
                        <Box style={{
                            width: '300px'
                        }}>
                            <ul>
                                {listItems}
                            </ul>
                        </Box>

                    );
                }
            }},
        {
            name: "Data Alteração",
            options: {


                customBodyRender: (value) => {

                    return (
                        <Box style={{
                            width: '150px'
                        }}>
                            {value}
                        </Box>
                    );
                }
            }},
        {
            name: "Ações",
            options: {
                filter: false,
                sort:false,
                searchable: false,
                print: false,
                download: false,

                customBodyRender: (value,dataIndex) => {

                    return (
                        <React.Fragment>

                            {


                                <Box style={{
                                    minWidth: '180px'
                                }}>


                                    <IconButton aria-label="Questionário"  title="Questionário" color="primary" onClick={(e)=>{ handleClickCadastrar(e,dataIndex.rowIndex)}}>
                                        <QuestionAnswerRoundedIcon />
                                    </IconButton>
                                    <IconButton aria-label="Alterar Nome"   title="Alterar Nome"  color="primary" onClick={(e)=>{ handleClickEditarNome(e,dataIndex.rowIndex)}}>
                                        <AccountBoxIcon />
                                    </IconButton>
                                    <IconButton aria-label="Excluir" title="Excluir"    onClick={(e)=>{ handleClickExcluir(e,dataIndex.rowIndex)}}>
                                        <HighlightOffRoundedIcon style={{ color: red[500] }}/>
                                    </IconButton>




                                </Box>



                            }


                        </React.Fragment>
                    );
                }
            }}];


    const options = {
        filterType: 'checkbox',
        textLabels : TextLabels,
        responsive: 'scroll',
        fixedHeader: true,
        tableBodyHeight: '100%',
        customToolbarSelect: () => {}

    };

   return (
        <React.Fragment>
            <CssBaseline/>

            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                            <StyledBreadcrumb
                                color="primary"
                                aria-current="page"
                                component="p"
                                label="Pessoal"
                                icon={<PeopleAltIcon fontSize="small"/>}
                            />
                        </Breadcrumbs>
                    </Grid>

                </Grid>
                <br/>
            </Grid>

            <Alert severity="info">
                <AlertTitle>Gestores</AlertTitle>
                <p>Prezado Gestor, esta aba é destinada informar a situação de pessoal da sua unidade.</p>
                <p>PORTARIA CONJUNTA Nº 9/DGPA/DIRAT/INSS, DE 25 DE AGOSTO DE 2020</p>
            </Alert>

            <Grid item xs={12}>

                <Grid container
                      alignItems="center"
                      justify="center">

                    <Grid item xs={12}>
                        <br/>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" color="primary">
                                {aps.unidade} - {aps.unidade_nome}
                            </Typography>
                        </Paper>
                    </Grid>
                    <br/>

                    <Grid item xs={12} md={10}>

                    </Grid>

                    <Grid item xs={12} md={1}>
                        <Button

                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}


                            startIcon={<AddIcon />}
                        >
                            Cadastrar
                        </Button>
                    </Grid>

                    <br/>




                    <Grid item xs={12}>
                        <br/>
                        <MUIDataTable
                            title={"Listagem"}
                            data={dados}
                            columns={columns}
                            options={options}
                        />
                    </Grid>

                </Grid>
            </Grid>

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {exibirTelaExclusao &&

            (
                <>

                    <Dialog
                        open={exibirTelaExclusao}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-exclusao"
                        aria-describedby="alert-dialog-description-exclusao"
                    >
                        <DialogTitle id="alert-dialog-title-exclusao">Excluir  {dados[indice][2].toUpperCase()}</DialogTitle>
                        <DialogContent>

                                 <Grid item xs={12} md={12}>

                                    <TextField fullWidth={true}
                                               id="outlined-multiline-static"
                                               label="Justificativa da decisão"
                                               multiline
                                               rows={5}
                                               name='motivo'
                                               defaultValue={formulario.motivo}
                                               onBlur={handleInputChangeExclusao}
                                               variant="outlined"
                                    />



                                </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={excluirServidor} color="primary">
                                Sim
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Não
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}



            {exibirTelaEdicao &&

            (
                <div>

                    <Dialog
                        open={exibirTelaEdicao}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-edicao"
                        aria-describedby="alert-dialog-description-edicao"
                    >
                        <DialogTitle id="alert-dialog-title-edicao">Alterar: {dados[indice][2]}</DialogTitle>
                        <DialogContent>

                            <Grid item xs={12} md={12}>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField id="nome-basic" label="Nome" fullWidth
                                               value={formularioNome.nome}
                                               name="nome"
                                               onChange={handleInputEdicao}
                                    />

                                </form>

                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={alterarNome} color="primary">
                                Sim
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Não
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}


        </React.Fragment>
    );
}


const mapStateToProps = state => ({
    dadosUnidade: state.dadosUnidade
})

const mapDispacthToProps = dispatch => bindActionCreators(UnidadeActions, dispatch);


export default connect(mapStateToProps, mapDispacthToProps)(Pessoal);






