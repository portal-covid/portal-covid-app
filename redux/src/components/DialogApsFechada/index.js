import React, {useState,memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {useSnackbar} from 'notistack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextLabels from "../../theme/textLabels";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid/Grid";
import ExibirMotivo from '../ExibirMotivo';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z" />
        </SvgIcon>
    );
}


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    typography:{
        color: theme.palette.info.contrastText
    },
    loading: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DialogApsFechada(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const columns = [
        "Código da Gerência",
        "Nome",
        "Tipo",
        "Modificações Contratos",
        "Modificações Epi/Epc",
        "Modificações Infraestrutura",
        "Modificações Pessoal",
        "Status",
        {
            name: "Decisão Automática",
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value) => {
                    if (value == 'SIM')
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
            name: "Motivo",
            options: {
                filter: false,
                sort:false,
                searchable: false,

                customBodyRender: (value,dataIndex) => {

                    return (
                        <React.Fragment>

                            {
                                (value && value.length > 0 ) && (

                                    <Button
                                        fullWidth={true}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        onClick={(e)=>{ handleClickDetalhar(e,dataIndex.rowIndex,dataIndex)}}

                                        startIcon={<FindInPageOutlinedIcon />}
                                    >
                                        Detalhar
                                    </Button>
                                )
                            }


                        </React.Fragment>
                    );
                }
            }},
        "Siape",
        {
            name: "Data/hora",
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value) => {


                    if(value.length > 0){
                       return( <> { new Date(value).toLocaleString('pt-BR')} </>)
                    }else{
                        return( <> </>)
                    }
                }




            }},







        "Usou servidores da CEAB?",
        "Decisão do Gestor",
        {
            name: "Falta EPI/EPC",
            options: {


                customBodyRender: (value,dataIndex) => {

                    const listItems = value.map((d) => <li key={dataIndex.rowIndex + d} style={{"listStyle":"none"}}>{d}</li>);


                    return (
                        <div>
                            <ul>
                                {listItems}
                            </ul>
                        </div>
                    );
            }
        }},
        {
            name: "Falta Contratos",
            options: {


                customBodyRender: (value,dataIndex) => {

                    const listItems = value.map((d) => <li key={dataIndex.rowIndex + d} style={{"listStyle":"none"}}>{d}</li>);


                    return (
                        <div>
                            <ul>
                                {listItems}
                            </ul>
                        </div>
                    );
                }
            }},
        'Servidores Adm e Gestores fora do grupo de risco (retorno)',
        'Perícia Médica (retorno)',
        'Ass. Social/Reab  (retorno)',
        'Estagiários (retorno)',
        'Temporários (retorno)',
        'Total de Gestores',
        'Gestores em grupo de risco/afastados motivo legal'];
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [telaDetalhar, setTelaDetalhar] = useState(false);
    const [dadosExibicao, setDadosExibicao] = useState({});

    const options = {
        filter: true,
        textLabels : TextLabels,
        responsive: 'scroll',
        fixedHeader: true,
        tableBodyHeight: '100%',

    };
    const data = [];

    for (let unidade in props) {


        let faltaEpiEpc = []
        if( props[unidade].status === props['tipoStatus']){


            if(props[unidade].epi.alcool === "nao"){
                faltaEpiEpc.push('Álcool')
            }

            if(props[unidade].epi.capote === "nao"){
                faltaEpiEpc.push('Capote')
            }

            if(props[unidade].epi.gorro === "nao"){
                faltaEpiEpc.push('Gorro')
            }
            if(props[unidade].epi.luvas === "nao"){
                faltaEpiEpc.push('Luvas')
            }
            if(props[unidade].epi.mascara === "nao"){
                faltaEpiEpc.push('Máscara')
            }
            if(props[unidade].epi.protetor_facial === "nao"){
                faltaEpiEpc.push('Protetor Facial')
            }

            if(props[unidade].epi.barreira_de_protecao === "nao"){
                faltaEpiEpc.push('Barreira de Proteção')
            }

            if(props[unidade].epc.inutilizacao_assentos === "nao"){
                faltaEpiEpc.push('Inutilização de assentos')
            }


            if(props[unidade].epc.barreira_de_protecao === "nao"){
                faltaEpiEpc.push('Barreira de Proteção')
            }

            if(props[unidade].epc.marcacao_solo_interna_externa === "nao"){
                faltaEpiEpc.push('Marcacao de solo interna/externa')
            }

            if(props[unidade].epc.termometro === "nao"){
                faltaEpiEpc.push('Termômetro')
            }

            if(props[unidade].epc.lixeiras_pedal === "nao"){
                faltaEpiEpc.push('Lixeiras(descarte resíduos infectantes)')
            }


            let faltaContrato = [];

            if(props[unidade].contratos.limpeza_conservacao === "nao"){
                faltaContrato.push('Limpeza/conservação')
            }
            if(props[unidade].contratos.manutencao.predial === "nao"){
                faltaContrato.push('Manutenção Predial')

            }
            if(props[unidade].contratos.manutencao.ar_condicionado === "nao"){
                faltaContrato.push('Manutenção ar condicionado')
            }
            if(props[unidade].contratos.manutencao.elevadores === "nao"){
                faltaContrato.push('Manutenção de elevadores')
            }
            if(props[unidade].contratos.vigilancia.eletronica === "nao"){
                faltaContrato.push('Contrado de vigilância eletrônica')
            }
            if(props[unidade].contratos.vigilancia.ostensiva === "nao"){
                faltaContrato.push('Contrato de vigilância ostensiva')
            }


            let contrato = '';
            let epi = '';
            let infra = '';
            let pessoal = '';


            if( props[unidade].modificacao.contrato){

                contrato =  new Date(props[unidade].modificacao.contrato).toLocaleString('pt-BR');
            }

            if( props[unidade].modificacao.epi){
                epi =  new Date(props[unidade].modificacao.epi).toLocaleString('pt-BR');
            }

            if( props[unidade].modificacao.infra){
                infra =  new Date(props[unidade].modificacao.infra).toLocaleString('pt-BR');
            }

            if( props[unidade].modificacao.pessoal){
                pessoal =  new Date(props[unidade].modificacao.pessoal).toLocaleString('pt-BR');
            }


            let decisaoAutomatica = '';
            let motivo = '';
            let siape = '';
            let datahora = '';
            let usouServidoresDaCeab = '';
            let decisaoGestor = '';


            if(props[unidade].modificacao
                && props[unidade].modificacao.decisao.length > 0
                && props[unidade].modificacao.decisao[0].ativo === 'SIM'){

                decisaoAutomatica = 'NÃO';
                motivo = props[unidade].modificacao.decisao[0].motivo;
                siape = props[unidade].modificacao.decisao[0].siape;
                decisaoGestor = props[unidade].modificacao.decisao[0].decisao;
                datahora = props[unidade].modificacao.decisao[0].data_alteracao;
                usouServidoresDaCeab = props[unidade].modificacao.decisao[0].total_ceab ;
            }else{
                decisaoAutomatica = 'SIM'
            }


            data.push([
                props[unidade].unidade,
                props[unidade].unidade_nome.replace( 'AGÊNCIA DA PREVIDÊNCIA SOCIAL', 'APS ') ,
                props[unidade].unidade_tipo,
                contrato,
                epi,
                infra,
                pessoal,
                props[unidade].status,
                decisaoAutomatica,
                motivo,
                siape,
                datahora,
                usouServidoresDaCeab,
                decisaoGestor,
                faltaEpiEpc,
                faltaContrato,
                props[unidade].pessoal.administrativo.retorno,
                props[unidade].pessoal.pericia_medica.retorno,
                props[unidade].pessoal.assistentes.retorno,
                props[unidade].pessoal.estagiarios.retorno,
                props[unidade].pessoal.temporarios.retorno,
                props[unidade].pessoal.administrativo.gestores,
                props[unidade].pessoal.administrativo.gerente_de_aps_grupo_de_risco,


            ])
        }


    }


    const handleClickDetalhar = async (e,dataIndex,row) => {


        const item = row.rowData;

        if(item && item[9].length >0){

            setDadosExibicao({
                        motivo : item[9],
                        data_alteracao :  item[11].toString(),
                        siape : item[10],
                        total_ceab :  item[12],
                        decisao :  item[13]

                    });
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



    const handleClickOpen = () => {

        setLoading(true);
        setTimeout(function () {
            setOpen(true);
            setLoading(false);
        },0);


    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleCloseDetalhar = () => {

        setTelaDetalhar(false);
        setDadosExibicao({})
    };

    return (
        <div style={{display : "inline"}}>

            <Typography  style={{cursor:"pointer"}} className={classes.typography} variant="h6" onClick={handleClickOpen}>
                {(props.titulo)}
                <HomeIcon style={{cursor:"pointer"}} alt="Visualizar"/>
            </Typography>



            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Sair
                        </Button>
                    </Toolbar>
                </AppBar>


                <Grid item xs={12} >
                    <MUIDataTable
                        title={props.titulo}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </Grid>

                { telaDetalhar && (

                    <ExibirMotivo dados={dadosExibicao}  open={telaDetalhar} close={handleCloseDetalhar}/>

                )};

            </Dialog>

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    );
}

export default memo(DialogApsFechada)