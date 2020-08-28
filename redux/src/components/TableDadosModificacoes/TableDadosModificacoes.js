import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextLabels from '../../theme/textLabels';





export default function TabelaDadosModificacoes(props) {


    const columns = ["Unidade", "Nome", "Tipo", "Status","Modificações Contratos ", "Modificações Epi/Epc",
        "Modificações Infraestrutura","Modificações Pessoal"];


    const options = {
        filterType: 'checkbox',
        textLabels : TextLabels,
        responsive: 'scroll',
        fixedHeader: true,
        tableBodyHeight: '100%',
        customToolbarSelect: () => {}
    };

    const data = [];

    for (let unidade in props) {



            let contrato = '';
            let epi = '';
            let infra = '';
            let pessoal = '';



        if( props[unidade].modificacao.contrato){

            contrato =  new Date(props[unidade].modificacao.contrato).toLocaleString('pt-BR');
        }

        if( props[unidade].modificacao.epi){
            epi =  new Date(props[unidade].modificacao.epi).toLocaleString('pt-BR');
        }

        if( props[unidade].modificacao.infra){
            infra =  new Date(props[unidade].modificacao.infra).toLocaleString('pt-BR');
        }

        if( props[unidade].modificacao.pessoal){
            pessoal =  new Date(props[unidade].modificacao.pessoal).toLocaleString('pt-BR');
        }


        data.push([
                props[unidade].unidade,
                props[unidade].unidade_nome.replace( 'AGÊNCIA DA PREVIDÊNCIA SOCIAL', 'APS ') ,
                props[unidade].unidade_tipo,
                props[unidade].status,

                contrato,
                epi,
                infra,
                pessoal

            ])



    }

    return  <React.Fragment>

        <Grid item xs={12}>
            <br/>
            <Typography  variant="h5" color="primary">
                Últimas Modificações
            </Typography>
            <br/>
        </Grid>

        <Grid item xs={12}>
            <MUIDataTable
                title={"Últimas Modificações"}
                data={data}
                columns={columns}
                options={options}
            />
        </Grid>
    </React.Fragment>
}