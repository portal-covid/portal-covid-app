import React from 'react';

import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

export default function SalasGuiches(props){

    return  <React.Fragment>
        <Card  className={props.classes.cardStyleInfra}>
            <CardContent>
                <Typography variant="h5" color="primary" className={props.classes.title} >
                    Salas e Guichês
                </Typography>
                <div>
                    <List>
                        <ListItem>
                            <ListItemText primary="Guichês  administrativo:"/>
                            <ListItemSecondaryAction>
                                <ListItemText primary={props.infraestrutura.qtd_guiches}/>
                            </ListItemSecondaryAction>

                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Salas assistente social:"/>
                            <ListItemSecondaryAction>
                                <ListItemText primary={props.infraestrutura.qtd_salas_ass}/>
                            </ListItemSecondaryAction>

                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Consultórios:"/>
                            <ListItemSecondaryAction>
                                <ListItemText primary={props.infraestrutura.salas_pericia}/>
                            </ListItemSecondaryAction>

                        </ListItem>



                    </List>
                </div>
            </CardContent></Card>

    </React.Fragment>

}