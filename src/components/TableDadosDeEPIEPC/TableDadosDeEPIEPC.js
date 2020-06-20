import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";


const columns = ["Categoria", "TIPO", "SIM", "NÃO","NÃO SE APLICA"];

const options = {
    filterType: 'checkbox',
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
        ["Álcool" , 'EPI'].concat(montaResposta(props.epi.alcool)),
        ["Capote" , 'EPI'].concat(montaResposta(props.epi.capote)),
        ["Luvas" , 'EPI'].concat(montaResposta(props.epi.luvas)),
        ["Máscara" , 'EPI'].concat(montaResposta(props.epi.mascaras)),
        ["Protetor Facial" , 'EPI'].concat(montaResposta(props.epi.protetor_facial)),
        ["Gorro" , 'EPI'].concat(montaResposta(props.epi.gorro)),
        ["Barreira de proteção" , 'EPC'].concat(montaResposta(props.epc.barreira_de_protecao)),
        ["Marcação de solo interna e externa" , 'EPC'].concat(montaResposta(props.epc.marcacao_solo_interna_externa)),
        ["Inutilização de assentos" , 'EPC'].concat(montaResposta(props.epc.inutilizacao_assentos))
    ];

    return  <React.Fragment>

        <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
                <h2>EPI/EPC</h2>
            </Typography>
        </Grid>

        <Grid item xs={12}>
            <MUIDataTable
                title={"Dados de EPI/EPC"}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>
    </React.Fragment>
}