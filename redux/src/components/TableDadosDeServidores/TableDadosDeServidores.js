import React, {useState} from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';
import { green,red } from '@material-ui/core/colors';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import Button from "@material-ui/core/Button/Button";
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Link from '@material-ui/core/Link';
import {useSnackbar} from "notistack";



export default function TableDadosDeServidores(props) {

    const columns = [

        {
            name: "Retorna",
            options: {
                filter: true,
                sort: false,

                customBodyRender: (value) => {
                    if (value === "SIM")
                        return (
                            <CheckCircleOutlineRoundedIcon style={{ color: green[500] }}/>
                        );
                    else
                        return (
                            <HighlightOffRoundedIcon style={{ color: red[500] }}/>
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

                            <Link href="#"  onClick={(e)=>{ handleClickOpen(e,dataIndex.rowIndex)}}>
                                {value}
                            </Link>

                        }


                    </React.Fragment>
                );
            }
        }}, "Nome","Área de Atuação", "lotação","unidade","gex",
        "CEAB","CEAP", "PGSP",
        "Grupo de Risco",
        "Afastamento legal",
        {
            name: "Motivos",
            options: {


                customBodyRender: (value,dataIndex) => {

                    let listItems = '';
                    if(value.length > 0){

                        listItems = value.map((d) => <li key={dataIndex.rowIndex + d} style={{"listStyle":"none"}}>{d}</li>);

                    }



                    return (
                        <div>
                            <ul>
                                {listItems}
                            </ul>
                        </div>
                    );
                }
            }},
        "Data da Alteração",
        {
            name: "Ações",
            options: {
                filter: false,
                sort:false,
                searchable: false,

                customBodyRender: (value,dataIndex) => {

                    return (
                        <React.Fragment>

                            {
                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={props.classes.button}
                                    onClick={(e)=>{ handleClickOpen(e,dataIndex.rowIndex)}}

                                    startIcon={<QuestionAnswerRoundedIcon />}
                                >
                                    Alterar
                                </Button>
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

    const data = [];
    const [telaCadastro, setTelaCadastro] = useState(false);
    const [indice, setIndice] = useState('');
    const [dadoEdicao, setDadoEdicao] = useState({});
    const {enqueueSnackbar} = useSnackbar();
    const handleInputChange = (event) => {
        event.preventDefault();

        setDadoEdicao({...dadoEdicao,
            [event.target.name]: event.target.value
        });
    };


    for (let s in props.dados){


        const servidor = props.dados[s];
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


        data.push([
            servidor.retorna,
            servidor.siape,
            servidor.nome,
            servidor.area_de_atuacao.toUpperCase(),
            servidor.lotacao,
            servidor.nome_unidade,
            servidor.gex,
            servidor.ceab === 'sim' ? 'X' : '',
            servidor.ceap === 'sim' ? 'X' : '',
            servidor.pgsp === 'sim' ? 'X' : '',
            servidor.grupo_de_risco.length > 0 ? 'X' : '',
            servidor.afastamento_legal === 'sim' ? 'X' : '',
            motivo,
            servidor.data_alteracao
        ]);


    }




    const salvarAlteracao = async (event) => {

        event.preventDefault();
        setTelaCadastro(false);
        enqueueSnackbar('Dados atualizados!  ', {
            variant: 'sucess',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });

    };


    const handleClose = () => {
        setTelaCadastro(false);
        setDadoEdicao({});
        setIndice('');
    };

    const handleClickOpen = async (e,dataIndex) => {
        setDadoEdicao(props.servidores[dataIndex]);
        setIndice(dataIndex);
        setTelaCadastro(true);

    };

    return  <React.Fragment>

        <Grid item xs={12}>
            <Typography variant="h5" color="primary">
                Servidores da unidade
            </Typography>
            <br/>
        </Grid>


        <Grid item xs={12}>
            <MUIDataTable
                title={"Servidores da unidade"}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>


        { telaCadastro && (


            <Dialog
                fullWidth={true}
                open={telaCadastro}
                onClose={handleClose}
                aria-labelledby="Questionário"
                aria-describedby="Questionário"
            >
                <DialogTitle id="alert-dialog-title">{"Questionário"}</DialogTitle>
                <DialogContent>

                    <Grid container spacing={1}>

                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">CEAB</FormLabel>
                                <RadioGroup
                                    name="servidores_ceab"
                                    value={dadoEdicao.servidores_ceab}
                                    onChange={handleInputChange}
                                    aria-label="ceab"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">CEAP</FormLabel>
                                <RadioGroup
                                    name="servidores_ceap"
                                    value={dadoEdicao.servidores_ceap}
                                    onChange={handleInputChange}
                                    aria-label="ceap"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">PGSP</FormLabel>
                                <RadioGroup
                                    name="servidores_pgsp"
                                    value={dadoEdicao.servidores_pgsp}
                                    onChange={handleInputChange}
                                    aria-label="pgsp"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>


                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Grupo de Risco</FormLabel>
                                <RadioGroup
                                    name="servidores_grupo_de_risco"
                                    value={dadoEdicao.servidores_grupo_de_risco}
                                    onChange={handleInputChange}
                                    aria-label="Grupo de Risco"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gestante/Lactante</FormLabel>
                                <RadioGroup
                                    name="servidores_lactante"
                                    value={dadoEdicao.servidores_lactante}
                                    onChange={handleInputChange}
                                    aria-label="Gestante/Lactante"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Filhos em idade escolar</FormLabel>
                                <RadioGroup
                                    name="servidores_idade_escolar"
                                    value={dadoEdicao.servidores_idade_escolar}
                                    onChange={handleInputChange}
                                    aria-label="Gestante/Lactante"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gestor</FormLabel>
                                <RadioGroup
                                    name="servidores_idade_escolar"
                                    value={dadoEdicao.gestor}
                                    onChange={handleInputChange}
                                    aria-label="Gestor"  row>
                                    <FormControlLabel value="sim" inputprops={{ 'aria-label': 'SIM' }} control={<Radio />} label="Sim" />
                                    <FormControlLabel value="nao" inputprops={{ 'aria-label': 'NAO' }} control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                    </Grid>



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

    </React.Fragment>
}