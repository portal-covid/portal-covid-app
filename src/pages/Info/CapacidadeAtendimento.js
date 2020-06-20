import React, { Component } from 'react';

import CapacidadeAtendimentoDetalhes from './CapacidadeAtendimentoDetalhes'
import FaixaDeAgendamentos from './FaixaDeAgendamentos'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

class CapacidadeAtendimento extends Component {
    render() {
       return  <React.Fragment>
           <Grid container component="main" className={this.props.classes.root}>

               <Grid item xs={12}>
                   <Typography variant="subtitle1" gutterBottom>
                       <h2>Capacidade de Atendimento  - Detalhes</h2>
                       {this.props.dados}
                   </Typography>
               </Grid>


                   <CapacidadeAtendimentoDetalhes
                       categoria="Administrativo"
                       salaEpera={this.props.dados.metragem_administrativo}
                       capacidadeFaixaHorario={this.props.dados.metragem_administrativo}
                       capacidadePessoalDisponivel={this.props.dados.administrativo}
                       ofertaAtendimentoFaixaHorario={this.props.dados.administrativo_vagas_hora}
                       ofertaAtendimentoDiario={this.props.dados.administrativo_vagas_dia}
                   />
           <FaixaDeAgendamentos dados='dados 2'/>
           </Grid>
        </React.Fragment>
    }
}
export default CapacidadeAtendimento;