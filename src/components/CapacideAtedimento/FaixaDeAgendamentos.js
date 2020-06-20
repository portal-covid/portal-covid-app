import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";



export default function FaixaDeAgendamentos(props) {

    return <React.Fragment>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card className={props.classes.cardStyleCapacidade}>
                    <CardContent>
                        <Typography variant="h5" color="primary" className={props.classes.title} >
                           Pessoal
                        </Typography>
                        <div>
                            <List>


                                <ListItem>
                                    <ListItemText primary="Administrativo:"/>
                                    <ListItemSecondaryAction>
                                        <ListItemText primary={props.capacidade_de_atendimento[0].administrativo}/>
                                    </ListItemSecondaryAction>

                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Assistente Social:"/>
                                    <ListItemSecondaryAction>
                                        <ListItemText primary={props.capacidade_de_atendimento[0].assistente}/>
                                    </ListItemSecondaryAction>

                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Perícia Médica:"/>
                                    <ListItemSecondaryAction>
                                        <ListItemText primary={props.capacidade_de_atendimento[0].peritos}/>
                                    </ListItemSecondaryAction>

                                </ListItem>

                            </List>
                        </div>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12} md={8}>
                <Card className={props.classes.cardStyleCapacidade}>
                    <CardContent>
                        <Typography variant="h5" color="primary" className={props.classes.title} >
                            Atendimento
                        </Typography>
                        <div>
                            <List>


                                <ListItem>
                                    <ListItemText primary="Total de atendimentos da aps:"/>
                                    <ListItemSecondaryAction>
                                        <ListItemText primary={props.capacidade_de_atendimento[0].administrativo_vagas_dia
                                        + props.capacidade_de_atendimento[0].assistentes_vagas_dia
                                        + props.capacidade_de_atendimento[0].pericia_vagas_dia}/>
                                    </ListItemSecondaryAction>

                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Total de segurados na aps por faixa de horário:"/>
                                    <ListItemSecondaryAction>
                                        <ListItemText primary={(props.capacidade_de_atendimento[0].pericia_vagas_hora_maximo + props.capacidade_de_atendimento[0].assistentes_vagas_hora + props.capacidade_de_atendimento[0].administrativo_vagas_hora)/ 4}/>
                                    </ListItemSecondaryAction>

                                </ListItem>

                            </List>
                        </div>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    </React.Fragment>
}

