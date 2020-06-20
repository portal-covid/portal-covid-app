import React from 'react';

import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

export default function AreaDeEspera(props){



    return  <React.Fragment>

        <Card className={props.classes.cardStyleInfra}>
            <CardContent>
                <Typography variant="h5" color="primary" className={props.classes.title} >
                    Áreas de Espera
                </Typography>
                <div>
                    <List>

                        <ListItem>
                            <ListItemText primary="Metragem Administrativo:"/>
                            <ListItemSecondaryAction>
                                <ListItemText primary={props.infraestrutura.metragem_administrativo}/>
                            </ListItemSecondaryAction>

                        </ListItem>


                        <ListItem>
                            <ListItemText primary="Metragem Perícia Médica:"/>
                            <ListItemSecondaryAction>
                                <ListItemText primary={props.infraestrutura.metragem_pericia_medica}/>
                            </ListItemSecondaryAction>

                        </ListItem>


                    </List>
                </div>
            </CardContent>
        </Card>

    </React.Fragment>

}