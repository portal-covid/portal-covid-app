import React, { Component } from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
}));

const cardStyle ={
        minWidth: 275,
        minHeight: '20vw'
    };


export default function CapacidadeAtendimentoDetalhes(props){
    const classes = useStyles();

        return <React.Fragment>

            <Card className={cardStyle} >
                <CardContent>
                    <Typography variant="h5" color="primary" className={classes.title} >
                        {props.categoria}
                    </Typography>
                    <Divider />
                    <div>
                        <List>


                            <ListItem>
                                <ListItemText primary="Tamanho da sala de espera:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.salaEpera}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Capacidade de atendimento por faixa de horário agendado:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.capacidadeFaixaHorario}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Capacidade de pessoal disponível:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.capacidadePessoalDisponivel}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Oferta de atendimento por faixa de horário agendado:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.ofertaAtendimentoFaixaHorario}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Oferta de atendimento diário:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.ofertaAtendimentoDiario}/>
                                </ListItemSecondaryAction>

                            </ListItem>

                        </List>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
}



