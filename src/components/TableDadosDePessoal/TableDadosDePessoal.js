import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const columns = ["Categoria", "Total", "Grupo de Risco", "Afastamento Legal","CEAB","Programa de Gestão","Gestores", "Retorno"];

const options = {
    filterType: 'checkbox',
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
        props.pessoal.administrativo.retorno
    ];

    const assistente = [
        "Assistente Social",
        props.pessoal.assistentes.total,
        props.pessoal.assistentes.grupo_de_risco,
        props.pessoal.assistentes.afastado_motivo_legal,
        props.pessoal.assistentes.retorno,
        0,0,0
    ];

    const pericia = [
        "Perícia Médica",
        props.pessoal.pericia_medica.total,
        props.pessoal.pericia_medica.grupo_de_risco,
        props.pessoal.pericia_medica.afastado_motivo_legal,
        props.pessoal.pericia_medica.retorno,
        0,0,0
    ];

    const estagiarios = [
        "Estagiários",
        props.pessoal.estagiarios.total,
        props.pessoal.estagiarios.grupo_de_risco,
        props.pessoal.estagiarios.afastado_motivo_legal,
        props.pessoal.estagiarios.retorno,
        0,0,0
    ];

    const temporarios = [
        "Temporários",
        props.pessoal.estagiarios.total,
        props.pessoal.estagiarios.grupo_de_risco,
        props.pessoal.estagiarios.afastado_motivo_legal,
        props.pessoal.estagiarios.retorno,
        0,0,0
    ];

    const data = [  admnistrativo,assistente,pericia,estagiarios,temporarios];

    return  <React.Fragment>

        <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
                <h2>Dados de Pessoal</h2>
            </Typography>
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