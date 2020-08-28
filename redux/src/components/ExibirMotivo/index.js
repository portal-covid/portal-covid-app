import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid/Grid";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

export default function ExibirMotivo(props) {

    const {  open, close, dados } = props;

    return (

        <Dialog
            fullWidth={true}
            open={open}
            onClose={close}
            aria-labelledby="Visualização do Motivo Cadastrado"
            aria-describedby="Visualização do Motivo Cadastrado"
        >
            <DialogTitle id="alert-dialog-title">{"Decisão do Gestor"}</DialogTitle>
            <DialogContent>

                <Grid container spacing={1}>

                    <Grid item xs={12} md={6}>
                        <List>
                            <ListItem>

                                <ListItemText xs={12}>
                                    <Typography variant="subtitle1" color="primary">
                                        Siape
                                    </Typography>
                                </ListItemText>
                                <ListItemSecondaryAction xs={12}>
                                    <ListItemText primary={dados.siape}/>
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemText xs={12}>
                                    <Typography variant="subtitle1" color="primary">
                                        Decisão
                                    </Typography>
                                </ListItemText>
                                <ListItemSecondaryAction xs={12}>
                                    <ListItemText primary={dados.decisao}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>

                            <ListItem>

                                <ListItemText xs={12}>
                                    <Typography variant="subtitle1" color="primary">
                                        Total de Ceabs:
                                    </Typography>
                                </ListItemText>
                                <ListItemSecondaryAction xs={12}>
                                    <ListItemText primary={dados.total_ceab}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText xs={12}>
                                    <Typography variant="subtitle1" color="primary">
                                        Data:
                                    </Typography>
                                </ListItemText>
                                <ListItemSecondaryAction xs={12}>
                                    <ListItemText primary={  new Date(dados.data_alteracao).toLocaleString('pt-BR')}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="primary">
                            Motivo
                        </Typography>

                        {dados.motivo}
                    </Grid>
                </Grid>



            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>


    );
}
