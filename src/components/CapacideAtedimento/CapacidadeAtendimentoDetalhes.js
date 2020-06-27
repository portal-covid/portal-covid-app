import React from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import { Divider } from '@material-ui/core';





export default function CapacidadeAtendimentoDetalhes(props){


        return <React.Fragment>

            <Card className={props.classes.cardStyleCapacidade} >
                <CardContent>
                    <Typography variant="h5" color="primary" className={props.classes.title} >
                        {props.categoria}
                    </Typography>
                    <Divider />
                    <div>
                        <List>


                            <ListItem>
                                <ListItemText primary="Tamanho da sala de espera:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.areaEspera}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Capacidade de atendimento por hora:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.capAtendFaixaHAgendado}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Capacidade de pessoal disponível:"/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={props.capacidadePessoalDisponivel}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Oferta de atendimento por hora:"/>
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



