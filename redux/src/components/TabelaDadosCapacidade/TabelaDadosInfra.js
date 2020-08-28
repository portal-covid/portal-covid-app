import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';

export default function TableDadosCapacidade(props) {
    const columns = ["Unidade", "Área Administrativo", "Área Perícia Médica", "Guichês", "Salas Ass/Reab", "Consultórios", "Scanners"];

    const dados = [];
    for (let unidade in props) {
        const objeto = props[unidade].infraestrutura;
        dados[unidade] = [
            props[unidade]._id,
            parseFloat(objeto.metragem_administrativo).toFixed(2),
            parseFloat(objeto.metragem_pericia_medica).toFixed(2),
            objeto.qtd_guiches,
            objeto.qtd_salas_ass,
            objeto.salas_pericia,
            objeto.qtd_scanner
        ];
    }

    const options = {
        filterType: 'checkbox',
        textLabels: TextLabels,
        responsive: 'scroll',
        fixedHeader: true,
        tableBodyHeight: '100%',
        
        customToolbarSelect: () => { }
    };

    const data = dados;

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <MUIDataTable
                    title={"Capacidade de Atendimento - Infraestrutura"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Grid>
        </React.Fragment>
    )
}