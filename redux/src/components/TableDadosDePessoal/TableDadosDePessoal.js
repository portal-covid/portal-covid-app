import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';


const columns = ["Categoria", "Total", "Grupo de Risco", "Afastamento Legal",
    "CEAB","Programa de Gestão","Gestores",
    "Gestores em grupo de risco/afastados motivo legal",
    "Gestores Retorno",
    "Retorno"];

const options = {
    filterType: 'checkbox',
    textLabels : TextLabels,
    responsive: 'scroll',
    fixedHeader: true,
    tableBodyHeight: '100%',
    customToolbarSelect: () => {}
};


export default function TableDadosDePessoal(props) {



    const admnistrativo = [
        "Administrativo",
        props.pessoal.administrativo.total,
        props.pessoal.administrativo.grupo_de_risco,
        props.pessoal.administrativo.afastado_motivo_legal,
        props.pessoal.administrativo.ceab,
        props.pessoal.administrativo.programa_gestao,
        props.pessoal.administrativo.gestores,
        props.pessoal.administrativo.gerente_de_aps_grupo_de_risco,
        parseInt(props.pessoal.administrativo.gestores)
        - parseInt(props.pessoal.administrativo.gerente_de_aps_grupo_de_risco),
        props.pessoal.administrativo.retorno
    ];

    const assistente = [
        "Assistentes/Reabilitadores",
        props.pessoal.assistentes.total,
        props.pessoal.assistentes.grupo_de_risco,
        props.pessoal.assistentes.afastado_motivo_legal,
        0,0,0,0,0,
        props.pessoal.assistentes.retorno,

    ];

    const pericia = [
        "Perícia Médica",
        props.pessoal.pericia_medica.total,
        props.pessoal.pericia_medica.grupo_de_risco,
        props.pessoal.pericia_medica.afastado_motivo_legal,
        0,0,0,0,0,
        props.pessoal.pericia_medica.retorno,

    ];

    const estagiarios = [
        "Estagiários",
        props.pessoal.estagiarios.total,
        props.pessoal.estagiarios.grupo_de_risco,
        props.pessoal.estagiarios.afastado_motivo_legal,
        0,0,0,0,0,
        props.pessoal.estagiarios.retorno,

    ];

    const temporarios = [
        "Temporários",
        props.pessoal.temporarios.total,
        props.pessoal.temporarios.grupo_de_risco,
        props.pessoal.temporarios.afastado_motivo_legal,
        0,0,0,0,0,
        props.pessoal.temporarios.retorno,

    ];

    const data = [  admnistrativo,assistente,pericia,estagiarios,temporarios];

    return  <React.Fragment>

        <Grid item xs={12}>
            <Typography variant="h5" color="primary">
                Dados de Pessoal
            </Typography>
            <br/>
        </Grid>


        <Grid item xs={12}>
            <MUIDataTable
                title={"Quantitativo de funcionários por categoria"}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>

    </React.Fragment>
}