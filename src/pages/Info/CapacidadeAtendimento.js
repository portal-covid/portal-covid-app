import React, {Component, useState} from 'react';

import CapacidadeAtendimentoDetalhes from './CapacidadeAtendimentoDetalhes'
import FaixaDeAgendamentos from './FaixaDeAgendamentos'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

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
        categoria: 'Assistente Social',
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
                   <Typography variant="subtitle1" gutterBottom>
                       <h2>Capacidade de Atendimento  - Faixa de agendamentos</h2>
                   </Typography>
               </Grid>

               <Grid item xs={12} className={props.classes.listBg}>
                   <div className={props.classes.root}>

                    <FaixaDeAgendamentos  {...props}/>

                   </div>
               </Grid>

               <Grid item xs={12}>
                   <Typography variant="subtitle1" gutterBottom>
                       <h2>Capacidade de Atendimento  - Detalhes</h2>
                   </Typography>
               </Grid>

               <Grid item xs={12} className={props.classes.listBg}>
                   <div className={props.classes.root}>

                       <Grid container spacing={1}>
                           <Grid item xs={12} md={4}>
                             <CapacidadeAtendimentoDetalhes  {...administrativo}/>
                           </Grid>
                           <Grid item xs={12} md={4}>
                             <CapacidadeAtendimentoDetalhes {...assistente}/>
                           </Grid>
                           <Grid item xs={12} md={4}>
                             <CapacidadeAtendimentoDetalhes {...pericia}/>
                           </Grid>
                       </Grid>
                   </div>
               </Grid>



           </Grid>
        </React.Fragment>

}
