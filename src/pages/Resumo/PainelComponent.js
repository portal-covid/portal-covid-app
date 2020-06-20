import React from 'react';
import Typography from '@material-ui/core/Typography';

function PainelComponent({dados}){

    console.log(dados);

    return (
        <React.Fragment>

            <Typography variant="h6">
                Total de agências
            </Typography>
            {dados.agencias}

            <Typography variant="h6">
                Agências abertas
            </Typography>
            {dados.agenciasAbertas}

            <Typography variant="h6">
                Agências fechadas
            </Typography>
            {dados.agenciasFechadas}

            <hr></hr>
            <Typography variant="h5">
                Servidores por tipo
            </Typography>

            <Typography variant="h6">
                Administrativo
            </Typography>
            {dados.servidoresPorTipo.admnistrativo}

            <Typography variant="h6">
                Administrativo Ceab
            </Typography>
            {dados.servidoresPorTipo.admnistrativo_ceab}

            <Typography variant="h6">
                Gestores
            </Typography>
            {dados.servidoresPorTipo["admnistrativo_git gestores"]}

            <Typography variant="h6">
                Peritos
            </Typography>
            {dados.servidoresPorTipo.perito}

            <Typography variant="h6">
                Assistentes
            </Typography>
            {dados.servidoresPorTipo.assistente}

            <hr></hr>
            <Typography variant="h5">
                Servidores por grupo de risco
            </Typography>
            
            <Typography variant="h6">
                Administrativo
            </Typography>
            {dados.servidoresPorGrupoRisco.admnistrativo}
            
            <Typography variant="h6">
                Peritos
            </Typography>
            {dados.servidoresPorGrupoRisco.perito}
            
            <Typography variant="h6">
                Assistentes
            </Typography>
            {dados.servidoresPorGrupoRisco.assistente}

            <hr></hr>
            <Typography variant="h5">
                Servidores por tipo de licença
            </Typography>
            
            <Typography variant="h6">
                Administrativo
            </Typography>
            {dados.servidoresPorTipoLicenca.admnistrativo}

            <Typography variant="h6">
                Peritos
            </Typography>
            {dados.servidoresPorTipoLicenca.perito}

            <Typography variant="h6">
                Assistentes
            </Typography>
            {dados.servidoresPorTipoLicenca.assistente}
            

        </React.Fragment>
    );
}

export default PainelComponent;