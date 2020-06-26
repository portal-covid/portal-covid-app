import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';

export default function TableDadosCapacidade(props) {
    const columns = ["Unidade", "Área Administrativo", "Área Perícia Médica", "Guichês", "Salas Assistentes", "Consultórios", "Scanners"];

    const dados = [];
    for (let unidade in props) {
        const objeto = props[unidade].infraestrutura;
        dados[unidade] = [
            props[unidade]._id,
            parseInt(objeto.metragem_administrativo),
            parseInt(objeto.metragem_pericia_medica),
            objeto.qtd_guiches,
            objeto.qtd_salas_ass,
            objeto.salas_pericia,
            objeto.qtd_scanner
        ];
    }

    const options = {
        filterType: 'checkbox',
        textLabels: TextLabels,
        
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