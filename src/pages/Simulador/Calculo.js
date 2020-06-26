export default class Calculo {

    static _preparar_dados(dados) {
    
        return {
            "unidade": dados._id,
            "unidade_nome": dados.nome,
            "servidores_retorno": dados.servidores_retorno > 0 ? parseInt(dados.servidores_retorno) : 0,
            "pericia_medica_retorno": dados.pericia_medica_retorno  > 0 ? parseInt(dados.pericia_medica_retorno) : 0,
            "assistentes_retorno": dados.assistentes_retorno ? parseInt(dados.assistentes_retorno) : 0,
            "metragem_administrativo": dados.metragem_administrativo ? dados.metragem_administrativo.replace(',','.') : 0.00,
            "metragem_pericia_medica": dados.metragem_pericia_medica ? dados.metragem_pericia_medica.replace(',','.') : 0.00,
            "qtd_salas_ass": dados.qtd_salas_ass  > 0 ? parseInt(dados.qtd_salas_ass) : 0,
            "salas_pericia": dados.salas_pericia > 0 ? parseInt(dados.salas_pericia) : 0,
            "qtd_guiches": dados.qtd_guiches  > 0 ? parseInt(dados.qtd_guiches) : 0
        }

    }

    static _calculaViabilidadeDoCalculo(aps) {

        if (parseInt(aps.servidores_retorno) === 0 && parseInt(aps.assistentes_retorno) === 0 && parseInt(aps.pericia_medica_retorno) === 0) {
            return false
        }

        if (aps.metragem_administrativo === 0) {
            return false
        }

        if (aps.qtd_salas_ass === 0 || aps.salas_pericia === 0 || aps.qtd_guiches === 0) {
            return false
        }

        return true
    }

    static _capacidadeEspacial(metragem) {

        return {
            'limite_pessoas_no_espaco': parseInt(metragem / 4)
        }
    }

    static _calcularVagasPericia(aps) {

        let _capacidade = aps.metragem_pericia_medica > 0 ? Calculo._capacidadeEspacial(aps.metragem_pericia_medica) : Calculo._capacidadeEspacial(aps.metragem_administrativo);
        let vagas = 0;
        let peritos = 0

        if (aps.pericia_medica_retorno > _capacidade.limite_pessoas_no_espaco) {
            aps.pericia_medica_retorno = _capacidade.limite_pessoas_no_espaco
        }

        if (aps.salas_pericia > aps.pericia_medica_retorno) {
            vagas = aps.pericia_medica_retorno * 15;
            peritos = aps.pericia_medica_retorno
        } else {
            vagas = aps.salas_pericia * 15;
            peritos = aps.salas_pericia
        }

        let pericia_vagas_hora = peritos * 4;
        return {
            peritos: peritos,
            pericia_vagas_dia: vagas,
            pericia_vagas_hora_maximo: parseFloat(pericia_vagas_hora.toFixed(2)),
            pericia_vagas_hora_media: parseFloat((vagas / 6).toFixed(2))
        }

    }

    static _calcularVagasAssistente(aps) {

        let _capacidade = Calculo._capacidadeEspacial(aps.metragem_administrativo);
        let vagas = 0;
        let assistente = 0;

        if (aps.assistentes_retorno > _capacidade.limite_pessoas_no_espaco) {
            aps.assistentes_retorno = _capacidade.limite_pessoas_no_espaco
        }

        if (aps.qtd_salas_ass > aps.assistentes_retorno) {
            vagas = aps.assistentes_retorno * 5;
            assistente = aps.assistentes_retorno;
        } else {
            vagas = aps.qtd_salas_ass * 5
            assistente = aps.qtd_salas_ass
        }

        let vagas_por_hora = assistente === aps.qtd_salas_ass ? assistente : vagas / 6;

        return {
            assistente: assistente,
            assistentes_vagas_dia: vagas,
            assistentes_vagas_hora: assistente,
            assistentes_vagas_media: parseFloat(vagas_por_hora.toFixed(2))
        }

    }

    static _calcularVagasAdministrativo(aps) {

        let _capacidade = Calculo._capacidadeEspacial(aps.metragem_administrativo);
        let vagas = 0;
        let administrativo = 0;

        if (aps.servidores_retorno > _capacidade.limite_pessoas_no_espaco) {
            aps.servidores_retorno = _capacidade.limite_pessoas_no_espaco
        }

        if (aps.qtd_guiches > aps.servidores_retorno) {
            vagas = (aps.servidores_retorno * 3 * 6) - aps.servidores_retorno;
            administrativo = aps.servidores_retorno
        } else {
            vagas = (aps.qtd_guiches * 3 * 6) - aps.qtd_guiches;
            administrativo = aps.qtd_guiches
        }

        return {
            administrativo: administrativo,
            administrativo_vagas_dia: vagas,
            administrativo_vagas_hora: parseInt(vagas / 6)
        }

    }

    static calcularCapacidade(dados) {
        
        let agregador = [];
        let aps = {};
        let zerado = {
            peritos: 0,
            pericia_vagas_dia: 0,
            pericia_vagas_hora_maximo: 0,
            pericia_vagas_hora_media: 0,
            assistente: 0,
            assistentes_vagas_dia: 0,
            assistentes_vagas_hora: 0,
            assistentes_vagas_media: 0,
            administrativo: 0,
            administrativo_vagas_dia: 0,
            administrativo_vagas_hora: 0
        }
        console.log(dados);

        try{
            aps = Calculo._preparar_dados(dados);

            const viavel = Calculo._calculaViabilidadeDoCalculo(aps);
            
            if (viavel) {

                const pericia = Calculo._calcularVagasPericia(aps);
                const assistente = Calculo._calcularVagasAssistente(aps);
                const administrativo = Calculo._calcularVagasAdministrativo(aps);

                agregador.push({ ...aps, ...pericia, ...assistente, ...administrativo })

            } else {

                agregador.push({ ...aps, ...zerado })

            }

        } catch (e) {
            console.log(e)
        }

        return agregador;

    }

}