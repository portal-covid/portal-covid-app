import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';

export default function TableDadosCapacidade(props) {
    const columns = ["Código","Unidade", "Tamanho Sala Espera", "Capacidade Atendimento", "Capacidade Pessoal", "Oferta de Atendimento", "Oferta de Atendimento Diário"];

    const dados = [];
    for (let unidade in props) {
        const objeto = props[unidade].capacidade_de_atendimento[0];
        dados[unidade] = [
            objeto.unidade,
            objeto.unidade_nome.replace( 'AGÊNCIA DA PREVIDÊNCIA SOCIAL', 'APS ') ,
            parseInt(objeto.metragem_administrativo) + parseInt(objeto.metragem_pericia_medica),
            objeto.administrativo_vagas_hora + objeto.assistentes_vagas_hora + objeto.pericia_vagas_hora_maximo,
            objeto.servidores_retorno + objeto.assistente + objeto.peritos,
            objeto.administrativo_vagas_hora + objeto.assistentes_vagas_hora + objeto.pericia_vagas_hora_maximo,
            objeto.administrativo_vagas_dia + objeto.assistentes_vagas_dia + objeto.pericia_vagas_dia,
            {
                administrativo: [
                    'Administrativo',
                    objeto.metragem_administrativo,
                    objeto.administrativo_vagas_hora,
                    objeto.servidores_retorno,
                    objeto.administrativo_vagas_hora,
                    objeto.administrativo_vagas_dia
                ],
                assistente: [
                    'Assitente Social',
                    objeto.metragem_administrativo,
                    objeto.assistentes_vagas_hora,
                    objeto.assistente,
                    objeto.assistentes_vagas_hora,
                    objeto.assistentes_vagas_dia
                ],
                perito: [
                    'Perícia Médica',
                    objeto.metragem_pericia_medica,
                    objeto.pericia_vagas_hora_maximo,
                    objeto.peritos,
                    objeto.pericia_vagas_hora_maximo,
                    objeto.pericia_vagas_dia
                ]
            },
        ];
    }

    const options = {
        filterType: 'checkbox',
        textLabels: TextLabels,
        expandableRows: true,
        expandableRowsHeader: false,
        expandableRowsOnClick: true,
        isRowExpandable: (dataIndex, expandedRows) => {
            // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
            if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
            return true;
        },
        renderExpandableRow: (rowData, rowMeta) => {
            return (
                <>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell>{dados[rowMeta.rowIndex][7].administrativo[0]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].administrativo[1]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].administrativo[2]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].administrativo[3]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].administrativo[4]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].administrativo[5]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell>{dados[rowMeta.rowIndex][7].assistente[0]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].assistente[1]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].assistente[2]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].assistente[3]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].assistente[4]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].assistente[5]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell>{dados[rowMeta.rowIndex][7].perito[0]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].perito[1]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].perito[2]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].perito[3]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].perito[4]}</TableCell>
                        <TableCell>{dados[rowMeta.rowIndex][7].perito[5]}</TableCell>
                    </TableRow>
                </>
            );
        },
        customToolbarSelect: () => { }
    };

    const data = dados;

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <MUIDataTable
                    title={"Capacidade Operacional - Detalhes"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Grid>
        </React.Fragment>
    )
}