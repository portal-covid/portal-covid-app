import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';


const columns = ["Categoria", "SIM", "NÃO","NÃO SE APLICA"];

const options = {
    filterType: 'checkbox',
    textLabels : TextLabels,
    responsive: 'scroll',
    fixedHeader: true,
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

export default function TableDadosDeEPIEPC(props) {

    const data = [
        ["Limpeza e conservação" ].concat(montaResposta(props.contratos.limpeza_conservacao)),
        ["Vigilância ostensiva" ].concat(montaResposta(props.contratos.vigilancia.ostensiva)),
        ["Vigilância eletrônica" ].concat(montaResposta(props.contratos.vigilancia.eletronica)),
        ["Manutenção predial" ].concat(montaResposta(props.contratos.manutencao.predial)),
        ["Manutenção ar condicionado" ].concat(montaResposta(props.contratos.manutencao.ar_condicionado)),
        ["Manutenção de elevadores"].concat(montaResposta(props.contratos.manutencao.elevadores))]
    ;

    return  <React.Fragment>

        <Grid item xs={12}>
            <Typography  variant="h5" color="primary">
                Contratos Essenciais
            </Typography>
        </Grid>

        <Grid item xs={12}>
            <MUIDataTable
                title={"Dados de Contratos Essenciais"}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>
    </React.Fragment>
}