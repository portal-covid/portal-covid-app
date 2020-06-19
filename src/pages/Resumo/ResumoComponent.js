import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../../shared/auth';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import PainelComponent from './PainelComponent';
import ResumoFactory from './ResumoFactory';

const useStyles = makeStyles((theme) => ({
	title: {
		marginTop: 30,
		marginBottom: 30
	}
}));

function ResumoComponent(){
    
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

            try{

                if(!response.data.dados){
                    const error = new Error("Consulta não retornou dados!")
                    error.mensagemParaUsuario = true;
                    throw error;
                }

                const resumo = ResumoFactory.dosDados(response.data.dados);

                if(!resumo.contemAlgo){
                    const erro = new Error("Dados da consulta não retornou nenhum valor", 'error');
                    erro.mensagemParaUsuario = true;
                    throw erro;
                }
                
                if(resumo.mensagemAlerta){
                    alerta(resumo.mensagemAlerta, 'warning');
                }
                
                setDados(resumo);
                    
            }catch(e){
                if(erro.mensagemParaUsuario){
                    setErro(e.message);
                }else{
                    console.error(e);
                    setErro('Erro desconhecido: ' + e.message);
                }
            }

        }).catch(e => {
            
            let mensagem = '';

            if(e.response && e.response.data && e.response.data.message){
                mensagem = e.response.data.message;
            }else{
                mensagem = 'Erro na conexão!';
            }
            alerta(mensagem, 'error');
            setErro(mensagem);

        });

    }, []);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h4" color="textPrimary" className={classes.title}>
                Painel Resumo - INSS BRASIL
            </Typography>
            { 
            erro ? (
                <div>Erro:{erro}</div>
            ) : !dados ? (
                <div>carregando...</div>
            ) : (
                <PainelComponent dados={dados}></PainelComponent>
            )}
        </React.Fragment>
    );
}

export default ResumoComponent;