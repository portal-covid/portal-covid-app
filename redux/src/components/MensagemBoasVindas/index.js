import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Hidden from "@material-ui/core/Hidden/Hidden";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },



}));


export default function MensagemBoasVindas() {
    const classes = useStyles;

     return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid item xs={12}  className={classes.titulo}>
                    <Hidden only={['xs', 'sm']}>
                        <Box textAlign="center" m={1}>
                            <Typography  variant="h1" color='primary' align="center">
                                Bem-vindo
                            </Typography>
                            <Typography variant="h2" color='primary' align="center">
                            Portal COVID-19
                            </Typography>
                            <br/>
                        </Box>
                    </Hidden>
                    <Hidden only={['md', 'lg','xl']}>
                        <Box textAlign="center" m={1}>
                        <Typography  variant="h4" color='primary' align="center">
                            Bem-vindo
                        </Typography>
                        <Typography  variant="h5" color='primary' align="center">
                        Portal COVID-19
                        </Typography>
                        <br/>
                    </Box>
                    </Hidden>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Typography variant="body1" gutterBottom className={classes.mensagem}>
                            Portal para acompanhamento da reabertura das unidades de atendimento do INSS,
                            considerando as medidas de segurança frente ao novo coronavírus.
                            Para informações detalhadas de pessoal, infraestrutura e itens de proteção,
                            selecione a unidade abaixo e clique em pesquisar
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}