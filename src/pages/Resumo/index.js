import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../../shared/auth';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	title: {
		marginTop: 30,
		marginBottom: 30
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '100%',
		marginTop: 30
	},
	select: {
		backgroundColor: '#fff'
	},
	divButton: {
		width: '100%',
		textAlign: 'center'
	},
	button: {
		marginTop: 10,
	}
}));

function Painel({dados}){

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

function Resumo(){
    
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    function alerta(mensagem, variant){
        enqueueSnackbar(mensagem, {
            variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
    }

    const [dados, setDados] = useState('');
    const [erro, setErro] = useState(false);

    useEffect(() => {

        const data = {
            unidades : ["01001"],
            tipoRelatorio: "TotalUnidades"   
        };

        const token = Auth.getToken();

        api.post('relatorio', data, {
            headers: {"Authorization" : "Bearer " + token }
        }).then(response => {

            if(response.data.dados) {
                try{
                        
                    const dados = response.data.dados;
                    
                    const arrayAgenciasOk = dados.TotalAgencias.length === 1;
                    const arrayAbertasFechadasOk = dados.TotalAgenciasAbertasFechadas.length === 2;
                    const abertas = dados.TotalAgenciasAbertasFechadas.find(info => info._id === "Abre");
                    const fechadas = dados.TotalAgenciasAbertasFechadas.find(info => info._id === "Não Abre");
                    const arrayServidoresOk = dados.TotalServidoresPorTipo.length === 1;
                    const arrayServidoresPorGrupoRiscoOk = dados.TotalServidoresPorTipoGrupoRisco.length === 1;
                    const arrayServidoresPorTipoLicencaOk = dados.TotalServidoresPorTipoLicencaLegal.length === 1;

                    if(!arrayAgenciasOk || !arrayAbertasFechadasOk || !abertas || !fechadas || !arrayServidoresOk || !arrayServidoresPorGrupoRiscoOk || !arrayServidoresPorTipoLicencaOk){
                        throw new Error("Erro ao ler os dados retornados", 'error');
                    }

                    const resumo = {
                        agencias: dados.TotalAgencias[0].totalAgencias,
                        agenciasAbertas: dados.TotalAgenciasAbertasFechadas[0].quantidade,
                        agenciasFechadas: dados.TotalAgenciasAbertasFechadas[0].quantidade,
                        servidoresPorTipo: dados.TotalServidoresPorTipo[0],
                        servidoresPorGrupoRisco: dados.TotalServidoresPorTipoGrupoRisco[0],
                        servidoresPorTipoLicenca: dados.TotalServidoresPorTipoLicencaLegal[0]
                    }
                    
                    setDados(resumo);
                
                }catch(e){
                    alerta(e.message);
                    setErro(true);
                }

            } else {
                alerta('Não foi encontrado dados para esta unidade!', 'info');
            }
        }).catch(e => {
            
            let mensagem = '';

            if(e.response && e.response.data && e.response.data.message){
                mensagem = e.response.data.message;
            }else{
                mensagem = 'Erro ao retornar os dados!';
            }
            alerta(mensagem, 'error');
            setErro(true);

        });

    }, []);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h4" color="textPrimary" className={classes.title}>
                Painel Resumo - INSS BRASIL
            </Typography>
            { 
            erro ? (
                <div>Erro</div>
            ) : !dados ? (
                <div>carregando...</div>
            ) : (
                <Painel dados={dados}></Painel>
            )}
        </React.Fragment>
    );
}

export default Resumo;