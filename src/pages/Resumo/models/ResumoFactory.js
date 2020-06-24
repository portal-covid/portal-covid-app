import Resumo from './Resumo';
class ResumoFactory{

    static dosDados(dados){

        const resumo = new Resumo();

        if(!Array.isArray(dados.TotalAgencias) || !dados.TotalAgencias.length){
            resumo.alertas.push("Total de agências retornou um valor inesperado");
        }else{
            if(!dados.TotalAgencias[0]){
                resumo.alertas.push("Erro ao ler o total de agências");
            }else{
                resumo.agencias = dados.TotalAgencias[0].totalAgencias;
            }
        }

        if(!Array.isArray(dados.TotalAgenciasAbertasFechadas)){
            resumo.alertas.push("TotalAgenciasAbertasFechadas retornou um valor inesperado");
        }else{
            const abertas = dados.TotalAgenciasAbertasFechadas.find(info => info.status === "Abre");
            const fechadas = dados.TotalAgenciasAbertasFechadas.find(info => info.status === "Não Abre");
            if(!abertas){
                resumo.alertas.push("Erro ao ler total de agências abertas");
            }else{
                resumo.agenciasAbertas = abertas.total;
            }
            if(!fechadas){
                resumo.alertas.push("Erro ao ler total de agências fechadas");
            }else{
                resumo.agenciasFechadas = fechadas.total;
            }
        }

        if(!Array.isArray(dados.TotalServidoresPorTipo) || !dados.TotalServidoresPorTipo.length){
            resumo.alertas.push("TotalServidoresPorTipo retornou um valor inesperado");
        }else{
            resumo.servidoresPorTipo = dados.TotalServidoresPorTipo[0];
        }

        if(!Array.isArray(dados.TotalServidoresPorTipoGrupoRisco) || !dados.TotalServidoresPorTipoGrupoRisco.length){
            resumo.alertas.push("TotalServidoresPorTipoGrupoRisco retornou um valor inesperado");
        }else{
            resumo.servidoresPorGrupoRisco = dados.TotalServidoresPorTipoGrupoRisco[0];
        }

        if(!Array.isArray(dados.TotalServidoresPorTipoLicencaLegal) || !dados.TotalServidoresPorTipoLicencaLegal.length){
            resumo.alertas.push("TotalServidoresPorTipoLicencaLegal retornou um valor inesperado");
        }else{
            resumo.servidoresPorTipoLicenca = dados.TotalServidoresPorTipoLicencaLegal[0];
        }

        if(!Array.isArray(dados.TotalSituacaoApsPorGerencia) || !dados.TotalSituacaoApsPorGerencia.length){
            resumo.alertas.push("Total Situacao Aps Por Gerencia retornou um valor inesperado");
        }else{
            resumo.situacaoApsPorGerencia = dados.TotalSituacaoApsPorGerencia;
        }






        return resumo;
    }

}

export default ResumoFactory;