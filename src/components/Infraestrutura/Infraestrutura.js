import React from 'react';

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

import AreaDeEspera from './AreaDeEspera'
import SalasGuiches from './SalasGuiches'
import Equipamentos from './Equipamentos'




export default function Infraestrutura(props){


    return  <React.Fragment>


        <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
                <h2>Infraestrutura</h2>
            </Typography>
        </Grid>

        <Grid item xs={12}>
            <div className={props.classes.root}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>

                      <AreaDeEspera   {...props}/>

                    </Grid>


                    <Grid item xs={12} md={4}>
                      <SalasGuiches   {...props}/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                     <Equipamentos  {...props}/>
                    </Grid>


                </Grid>

            </div>
        </Grid>



    </React.Fragment>

}