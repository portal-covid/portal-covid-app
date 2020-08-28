import React from 'react';

import CapacidadeAtendimentoDetalhes from './CapacidadeAtendimentoDetalhes'
import FaixaDeAgendamentos from './FaixaDeAgendamentos'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";


export default function CapacidadeAtendimento(props){



    const administrativo  = {
        categoria: 'Administrativo',
        areaEspera : props.capacidade_de_atendimento[0].metragem_administrativo,
        capAtendFaixaHAgendado: props.capacidade_de_atendimento[0].administrativo_vagas_hora,
        capacidadePessoalDisponivel: props.capacidade_de_atendimento[0].administrativo,
        ofertaAtendimentoFaixaHorario: props.capacidade_de_atendimento[0].administrativo_vagas_hora,
        ofertaAtendimentoDiario: props.capacidade_de_atendimento[0].administrativo_vagas_dia,

    }

    const assistente  = {
        categoria: 'Assistentes/Reabilitadores',
        areaEspera : props.capacidade_de_atendimento[0].metragem_administrativo,
        capAtendFaixaHAgendado: props.capacidade_de_atendimento[0].assistentes_vagas_hora,
        capacidadePessoalDisponivel: props.capacidade_de_atendimento[0].assistente,
        ofertaAtendimentoFaixaHorario: props.capacidade_de_atendimento[0].assistentes_vagas_hora,
        ofertaAtendimentoDiario: props.capacidade_de_atendimento[0].assistentes_vagas_dia,

    }

    const pericia  = {
        categoria: 'Perícia Médica',
        areaEspera : props.capacidade_de_atendimento[0].metragem_pericia_medica,
        capAtendFaixaHAgendado: props.capacidade_de_atendimento[0].pericia_vagas_hora_maximo,
        capacidadePessoalDisponivel: props.capacidade_de_atendimento[0].peritos,
        ofertaAtendimentoFaixaHorario: props.capacidade_de_atendimento[0].pericia_vagas_hora_maximo,
        ofertaAtendimentoDiario: props.capacidade_de_atendimento[0].pericia_vagas_dia,

    }

    return  <React.Fragment>
           <Grid container component="main" className={props.classes.root}>



               <Grid item xs={12}>
                   <Typography variant="h5" color='primary'>
                       Capacidade de Atendimento  - Faixa de agendamentos
                   </Typography>
               </Grid>

               <Grid item xs={12} >

                    <FaixaDeAgendamentos classes={props.classes} {...props}/>


               </Grid>

               <Grid item xs={12} >
                   <Typography  variant="h5" color='primary'>
                       Capacidade de Atendimento  - Detalhes
                   </Typography>
               </Grid>

               <Grid item xs={12}>
                   <div className={props.classes.root}>

                       <Grid container spacing={1}>
                           <Grid item xs={12} md={4}>
                             <CapacidadeAtendimentoDetalhes classes={props.classes} {...administrativo}/>
                           </Grid>
                           <Grid item xs={12} md={4}>
                             <CapacidadeAtendimentoDetalhes classes={props.classes} {...assistente}/>
                           </Grid>
                           <Grid item xs={12} md={4}>
                             <CapacidadeAtendimentoDetalhes classes={props.classes} {...pericia}/>
                           </Grid>
                       </Grid>
                   </div>
               </Grid>



           </Grid>
        </React.Fragment>

}
