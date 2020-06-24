import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';


const columns = ["Nome", "Sigla","Código da Gerência", "Abre","Não Abre", '% Agências Fechadas'];

const options = {
    filterType: 'checkbox',
    textLabels : TextLabels,
    customToolbarSelect: () => {}

};

const montaResposta = function (item) {

    if(item.toLowerCase() === 'sim'){

        return ['X','','']
    }else if(item.toLowerCase() === 'nao'){

        return ['','X','']
    }else if(item.toLowerCase() === 'nao se aplica'){

        return ['','','X']
    }else{
        return ['-','-','-']
    }

};

export default function TableDadosDeSituacaoAps(props) {

    const data = [];

    props.situacaoApsPorGerencia.forEach(function (elemento) {

        let soma  = parseInt(elemento.situacao.abertas) + parseInt(elemento.situacao.fechadas);

        let percentual = (parseInt(elemento.situacao.fechadas)/soma )  * 100;

        data.push([elemento.nome,
                    elemento.sigla,
                    elemento.gerencia,
                    elemento.situacao.abertas,
                    elemento.situacao.fechadas,
                    percentual.toFixed(2)
            ])

    });


    return  <React.Fragment>

        <Grid item xs={12}>
            <br/>
            <Typography  variant="h5" color="primary">
               Gerências
            </Typography>
        </Grid>


        <Grid item xs={12}>
            <br/>
            <MUIDataTable
                title={"Relação da situação das agêncas por gerência executiva "}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>
    </React.Fragment>
}