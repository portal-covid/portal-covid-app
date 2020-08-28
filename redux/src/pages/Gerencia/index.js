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
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Creators as UnidadeActions} from "../../redux/store/ducks/dadosUnidade";
import {Alert, AlertTitle} from "@material-ui/lab";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import TextLabels from "../../theme/textLabels";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import DialogGestao from "../../components/DialogGestao";
import ExibirMotivo from "../../components/ExibirMotivo";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Dica from "../../components/Dica";

import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

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


function GerenciaAberturaAgencias(props) {

    const {updateNome} = props;
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
    const token = Auth.getToken();


    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState(false);
    const [dadoEdicao, setDadoEdicao] = useState({});
    const [dadosExibicao, setDadosExibicao] = useState({});
    const [indice, setIndice] = useState('');

    const [telaCadastro, setTelaCadastro] = useState(false);
    const [telaDetalhar, setTelaDetalhar] = useState(false);

    const [formulario, setFormulario] = useState({
        motivo: '',
        servidoresCeab: '',
        tipo_decisao:''
    });

    const [decisao, setDecisao] = React.useState('');

    const handleChange = (event) => {
        setDecisao(event.target.value);
    };


    const tooltips = {
        gestor: 'Indique se a agência irá abrir ou não abrir',
        servidores_ceab: 'Informar a quantidade caso seja usado servidores da CEAB para o atendimento',
        motivo: 'Justificativa que motivou a tomada da decisão'
    }


    const handleInputChange = (event) => {
        event.preventDefault();

        setFormulario({...formulario,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeDecisao = (event) => {
        event.preventDefault();

        setFormulario({...formulario,
            [event.target.name]: event.target.value
        });
    };

    const handleClickOpen = async (e,dataIndex) => {
        setDadoEdicao(dados[dataIndex]);
        setIndice(dataIndex);
        setTelaCadastro(true);

    };

    const handleClickDetalhar = async (e,dataIndex) => {

        if(dados[dataIndex][9] && dados[dataIndex][9].decisao.length === 1){
            setDadosExibicao(dados[dataIndex][9].decisao[0]);
            setTelaDetalhar(true);
        }else{

            enqueueSnackbar('Não existe motivo cadastrado!  ', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

        }





    };


    const handleClose = () => {
        setTelaCadastro(false);
        setDadoEdicao({});
        setDadosExibicao({});
        setTelaDetalhar(false);
        setIndice('');
        setDecisao('');
        setFormulario({
            motivo: '',
            servidoresCeab: 0,
            tipo_decisao:''
        });
    };


    const salvarAlteracao = async (event) => {

        event.preventDefault();
        setTelaCadastro(false);
        if(formulario['tipo_decisao'] === 'auto'){
            ativarAutomatico(event)
        }else  if(formulario['tipo_decisao'] === 'manual'){
            registrarDecisao(event)
        }else{

            enqueueSnackbar('Falha ao salvar decisão!  ', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

        }

    };

    const ativarAutomatico = async  (event) => {

        event.preventDefault();
        setLoading(true);

        try {

            let resp = {
                _id:  dadoEdicao[0],
                tipoOperacao: "DesativarTodasDecisoesDeAbertura",
            };
            resp['dados'] = {};

            await api.post('unidades', resp, {
                headers: {"Authorization" : "Bearer " + token }
            }).then(response => {

                if(response.data.ok){

                   getUnidadeAtualizada(dadoEdicao[0]);

                    enqueueSnackbar('Ativação realizada com sucesso!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }else{

                    setLoading(false);
                    enqueueSnackbar('Erro ao processar a solicitação! - ' + response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }
                handleClose();
            });
        } catch(error) {

            setLoading(false);
            let mensagem = error.toString();


            if(mensagem === "Error: Request failed with status code 401"){
                mensagem = 'Sessão expirada - Refazer login'
            }

            enqueueSnackbar('Erro ao processar a solicitação!  ' + mensagem, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

        }


    };

    const registrarDecisao = async  (event) => {


        event.preventDefault();

        let novaDecisao = null;

        if(decisao.length > 1){
            novaDecisao = decisao === 'sim' ? 'Abre' : "Não Abre";
        }else{
            enqueueSnackbar('Selecione uma decisão!  ', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            return false
        }

        let serv = parseInt(formulario.servidoresCeab);

        if( isNaN(serv)){
            serv = 0

        }


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

        setLoading(true);


        try {


            let resp = {
                _id:  dadoEdicao[0],
                tipoOperacao: "AtualizarDadosDecisoesDeAbertura",
            };

            resp['dados'] = {
                status : novaDecisao,
                servidoresCeab : serv,
                motivo: formulario.motivo
            };

            await api.post('unidades', resp, {
                headers: {"Authorization" : "Bearer " + token }
            }).then(response => {

                if(response.data.ok){

                    getUnidadeAtualizada(dadoEdicao[0]);

                    enqueueSnackbar('Dados salvos com sucesso!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }else{

                    setLoading(false);
                    enqueueSnackbar('Erro ao salvar dados! - ' + response.data.message, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });

                }

                handleClose();
            });
        } catch(error) {

            setLoading(false);
            let mensagem = error.toString();

            if(mensagem === "Error: Request failed with status code 401"){
                mensagem = 'Sessão expirada - Refazer login'
            }

            enqueueSnackbar('Erro ao salvar dados!  ' + mensagem, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

        }


    };


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
            tipoRelatorio: "TotalUnidades"
        };

        const token = Auth.getToken();

        api.post('relatorio', data, {
            headers: {"Authorization": "Bearer " + token}
        }).then(response => {

            setLoading(false);
            if (!response.data.dados) {
                const error = new Error("Consulta não retornou dados!");
                error.mensagemParaUsuario = true;
                throw error;
            }



            for(let indice in response.data.dados.TotalRecursosUnidades) {
                const un = response.data.dados.TotalRecursosUnidades[indice];


                let decisaoAutomatica;

                if ( !un.modificacao
                    || un.modificacao.decisao.length === 0
                    || un.modificacao.decisao[0].ativo === 'NAO') {
                    decisaoAutomatica = true;
                } else {
                    decisaoAutomatica = false;
                }


                dadosTabela[indice] = [
                    un.unidade,
                    un.unidade_nome.replace('AGÊNCIA DA PREVIDÊNCIA SOCIAL', 'APS '),
                    un.status,
                    un.pessoal.administrativo.gestores,
                    un.pessoal.administrativo.gerente_de_aps_grupo_de_risco,
                    un.pessoal.administrativo.retorno,
                    un.pessoal.temporarios.retorno,
                    decisaoAutomatica,
                    decisaoAutomatica,
                    un.modificacao
                ];

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



    async function getUnidadeAtualizada(unidade) {

        setLoading(true);
        const data = {
            unidades: [unidade],
            tipoRelatorio: "TotalUnidades"
        };

        const token = Auth.getToken();
        api.post('relatorio', data, {
            headers: {"Authorization": "Bearer " + token}
        }).then(response => {

            setLoading(false);
            if (!response.data.dados) {
                const error = new Error("Consulta não retornou dados!");
                error.mensagemParaUsuario = true;
                throw error;
            }

            let dadosAtualiados = []

            for(let i in response.data.dados.TotalRecursosUnidades) {
                const un = response.data.dados.TotalRecursosUnidades[i];


                let decisaoAutomatica;

                if ( !un.modificacao
                    || un.modificacao.decisao.length === 0
                    || un.modificacao.decisao[0].ativo === 'NAO') {
                    decisaoAutomatica = true;
                } else {
                    decisaoAutomatica = false;
                }


                dadosAtualiados = [
                    un.unidade,
                    un.unidade_nome.replace('AGÊNCIA DA PREVIDÊNCIA SOCIAL', 'APS '),
                    un.status,
                    un.pessoal.administrativo.gestores,
                    un.pessoal.administrativo.gerente_de_aps_grupo_de_risco,
                    un.pessoal.administrativo.retorno,
                    un.pessoal.temporarios.retorno,
                    decisaoAutomatica,
                    decisaoAutomatica,
                    un.modificacao
                ];

            }
            const copia = dados.slice();
            copia[indice] = dadosAtualiados;
            setDados(copia);


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



    }

    const options = {
        filterType: 'checkbox',
        textLabels : TextLabels,
        responsive: 'scroll',
        fixedHeader: true,
        tableBodyHeight: '100%',
        customToolbarSelect: () => {}

    };
    const columns = ["Unidade", "Nome", {
        name: "Situação",
        options: {
            customBodyRender: (value) => {
                if (value === "Abre")
                    return (
                        <>{value}</>
                    );
                else
                    return (
                        <div style={{ color: '#ff0520' }}>{value}</div>
                    );
            }
        }
    },
        "Gestores",
        "Gestores em grupo de risco/afastados motivo legal",
        "Administrativos (retorno)",
        "Temporários (retorno)",
        {
            name: "Decisão Automática",
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value) => {
                    if (value)
                        return (
                            <>SIM</>
                        );
                    else
                        return (
                            <div style={{ color: '#ff0520' }}>Não</div>
                        );
                }

            }},
        {
            name: "Ações",
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value,dataIndex) => {

                    return (
                        <React.Fragment>



                            <Button
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    onClick={(e)=>{ handleClickOpen(e,dataIndex.rowIndex)}}

                                    startIcon={<CreateIcon />}
                                >
                                    Alterar
                                </Button>

                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    onClick={(e)=>{ handleClickDetalhar(e,dataIndex.rowIndex)}}

                                    startIcon={<FindInPageOutlinedIcon />}
                                >
                                    Detalhar
                                </Button>
                        </React.Fragment>

                    );
                }
            }}
    ];

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
                                            label="Gestores"
                                            icon={<HowToRegIcon fontSize="small"/>}
                                        />
                                    </Breadcrumbs>
                                </Grid>

                            </Grid>
                            <br/>
                        </Grid>


                        <Alert severity="info">
                            <AlertTitle>Gestores</AlertTitle>
                            <p>Prezado Gestor, esta aba é destinada a definir a situação de abertura e fechamento das agências</p>
                        </Alert>


                     <Grid container>


                            <Grid item xs={12}>
                                <br/>
                                <Typography variant="h5" color="primary">
                                    Gestão <DialogGestao/>
                                </Typography>
                                <br/>
                            </Grid>


                            <Grid item xs={12}>
                                <MUIDataTable
                                    title={"Gestão das agências"}
                                    data={dados}
                                    columns={columns}
                                    options={options}
                                />
                            </Grid>

                        </Grid>



                        { telaCadastro && (


                            <Dialog
                                fullWidth={true}
                                open={telaCadastro}
                                onClose={handleClose}
                                aria-labelledby="Situação das agências"
                                aria-describedby="Situação das agências"
                            >
                                <DialogTitle id="alert-dialog-title">{"Situação das agências"}</DialogTitle>
                                <DialogContent>


                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Indique o tipo de decisão</FormLabel>
                                        <RadioGroup
                                            name="tipo_decisao"
                                            value={formulario.tipo_decisao}
                                            onChange={handleChangeDecisao}
                                            aria-label="escolher tipo de decisão"  row>
                                            <FormControlLabel value='auto' inputprops={{ 'aria-label': 'Automatica' }} control={<Radio />} label="Automática" />
                                            <FormControlLabel value='manual' inputprops={{ 'aria-label': 'Manual' }} control={<Radio />} label="Manual" />
                                        </RadioGroup>
                                    </FormControl>


                                    {formulario.tipo_decisao === 'manual' && (
                                        <>
                                            <Divider variant="middle" /><br/>

                                             <Grid container spacing={1}>

                                        <Grid item xs={6}>


                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Decisão do gestor
                                                    <Dica texto={tooltips.gestor}/>
                                                </FormLabel>
                                                <RadioGroup  row
                                                             id='rd'
                                                             aria-label="Informe a decisão do gestor"
                                                             name="decisaoFinal" value={decisao} onChange={handleChange}
                                                >
                                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'Abre' }} control={<Radio />} label="Abre" />
                                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'Não Abre' }} control={<Radio />} label="Não Abre" />

                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>
                                        <Grid item xs={6}>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Servidores CEAB
                                                    <Dica texto={tooltips.servidores_ceab}/>
                                                </FormLabel>
                                                <form className={classes.root} noValidate autoComplete="off">

                                                    <TextField fullWidth
                                                               id="totalcb"
                                                               value={formulario.servidoresCeab}
                                                               name="servidoresCeab"
                                                               onChange={handleInputChange}
                                                               aria-describedby="Total de Servidores da ceab indicados para atendimento"
                                                               type='number'
                                                    />


                                                </form>

                                            </FormControl>

                                        </Grid>
                                        <br/>
                                        <Grid item xs={12} md={12}>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Motivo da decisão
                                                    <Dica texto={tooltips.motivo}/>
                                                </FormLabel>
                                                <br/>
                                                <br/>
                                            </FormControl>
                                            <TextField fullWidth={true}
                                                       id="outlined-multiline-static"
                                                       label="Justificativa"
                                                       multiline
                                                       rows={10}
                                                       name='motivo'
                                                       defaultValue={formulario.motivo}
                                                       onBlur={handleInputChange}
                                                       variant="outlined"
                                            />



                                        </Grid>

                                    </Grid>
</>
                                    )}

                                    {formulario.tipo_decisao === 'auto' && (

                                        <>
                                            <Divider variant="middle" /><br/>
                                            <Alert severity="error">Se houver decisão cadastrada, a mesma será excluída</Alert>

                                        </>
                                    )}



                                </DialogContent>
                                <DialogActions>
                                    <Button   onClick={(e)=>{ salvarAlteracao(e)}}  color="primary" autoFocus>
                                        Salvar
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Sair
                                    </Button>
                                </DialogActions>
                            </Dialog>


                        )}


                        { telaDetalhar && (

                            <ExibirMotivo dados={dadosExibicao}  open={telaDetalhar} close={handleClose}/>

                        )}







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


export default connect(mapStateToProps, mapDispacthToProps)(GerenciaAberturaAgencias);
