import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";


const columns = ["Categoria", "SIM", "NÃO","NÃO SE APLICA"];

const options = {
    filterType: 'checkbox',
};

const montaResposta = function (item) {
console.log(item)
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
            <Typography variant="subtitle1" gutterBottom>
                <h2>Contratos Essenciais</h2>
            </Typography>
        </Grid>

        <MUIDataTable
            title={"Dados de Contratos Essenciais"}
            data={data}
            columns={columns}
            options={options}
        />
    </React.Fragment>
}