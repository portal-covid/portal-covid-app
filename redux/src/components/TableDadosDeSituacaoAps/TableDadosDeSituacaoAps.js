import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';


const columns = ["Código da Gerência", "Nome", "Sigla", "Abre", "Não Abre", '% Agências Fechadas'];

const options = {
    filterType: 'checkbox',
    textLabels: TextLabels,
    responsive: 'scroll',
    fixedHeader: true,
    tableBodyHeight: '100%',
    customToolbarSelect: () => { }

};


export default function TableDadosDeSituacaoAps(props) {

    const data = [];

    if (props.situacaoApsPorGerencia) {
        props.situacaoApsPorGerencia.forEach(function (elemento) {

            let soma = parseInt(elemento.situacao.abertas) + parseInt(elemento.situacao.fechadas);

            let percentual = (parseInt(elemento.situacao.fechadas) / soma) * 100;

            data.push([elemento.gerencia,
            elemento.nome,
            elemento.sigla,
            elemento.situacao.abertas,
            elemento.situacao.fechadas,
            percentual.toFixed(2)
            ])

        });
    }


    return <React.Fragment>

        <Grid item xs={12}>
            <br />
            <Typography variant="h5" color="primary">
                Gerências
            </Typography>
        </Grid>


        <Grid item xs={12}>
            <br />
            <MUIDataTable
                title={"Relação da situação das agêncas por gerência executiva "}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>
    </React.Fragment>
}