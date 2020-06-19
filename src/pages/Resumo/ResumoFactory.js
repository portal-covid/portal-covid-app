class Resumo {

    agencias = null;
    agenciasAbertas = null;
    agenciasFechadas = null;
    servidoresPorTipo = null;
    servidoresPorGrupoRisco = null;
    servidoresPorTipoLicenca = null;

    alertas = [];

    get contemAlgo(){
        return !!(this.agencias || 
            this.agenciasAbertas || 
            this.agenciasFechadas || 
            this.servidoresPorTipo || 
            this.servidoresPorGrupoRisco || 
            this.servidoresPorTipoLicenca);
    }

    get mensagemAlerta(){
        if(this.alertas.length){
            return this.alertas.concat(', ');
        }else{
            return "";
        }
    }
    
}

class ResumoFactory{

    static dosDados(dados){

        const resumo = new Resumo;

        if(!Array.isArray(dados.TotalAgencias) || !dados.TotalAgencias.length){
            this.alertas.push("Total de agências retornou um valor inesperado");
        }else{
            if(!dados.TotalAgencias[0]){
                this.alertas.push("Erro ao ler o total de agências");
            }else{
                resumo.agencias = dados.TotalAgencias[0].totalAgencias;
            }
        }

        if(!Array.isArray(dados.TotalAgenciasAbertasFechadas)){
            this.alertas.push("TotalAgenciasAbertasFechadas retornou um valor inesperado");
        }else{
            const abertas = dados.TotalAgenciasAbertasFechadas.find(info => info.status === "Abre");
            const fechadas = dados.TotalAgenciasAbertasFechadas.find(info => info.status === "Não Abre");
            if(!abertas){
                this.alertas.push("Erro ao ler total de agências abertas");
            }else{
                resumo.agenciasAbertas = abertas.total;
            }
            if(!fechadas){
                this.alertas.push("Erro ao ler total de agências fechadas");
            }else{
                resumo.agenciasFechadas = fechadas.total;
            }
        }

        if(!Array.isArray(dados.TotalServidoresPorTipo) || !dados.TotalServidoresPorTipo.length){
            this.alertas.push("TotalServidoresPorTipo retornou um valor inesperado");
        }else{
            resumo.servidoresPorTipo = dados.TotalServidoresPorTipo[0];
        }

        if(!Array.isArray(dados.TotalServidoresPorTipoGrupoRisco) || !dados.TotalServidoresPorTipoGrupoRisco.length){
            this.alertas.push("TotalServidoresPorTipoGrupoRisco retornou um valor inesperado");
        }else{
            resumo.servidoresPorGrupoRisco = dados.TotalServidoresPorTipoGrupoRisco[0];
        }

        if(!Array.isArray(dados.TotalServidoresPorTipoLicencaLegal) || !dados.TotalServidoresPorTipoLicencaLegal.length){
            this.alertas.push("TotalServidoresPorTipoLicencaLegal retornou um valor inesperado");
        }else{
            resumo.servidoresPorTipoLicenca = dados.TotalServidoresPorTipoLicencaLegal[0];
        }

        return resumo;
    }

}

export default ResumoFactory;