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

export default Resumo;