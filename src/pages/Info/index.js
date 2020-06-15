import React, { useState, useEffect }  from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
  
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	card: {
		backgroundColor: theme.palette.background.paper,
    },
    divButton: {
        width: '100%',
        textAlign: 'right'
    }
}));

export default function Info() {
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
	const classes = useStyles();
    const history = useHistory();
	const [dados, setDados] = useState(location.state.detail);
	console.log(dados);

    const handleChange = (event) => {
        event.preventDefault();
        history.push('/form');
    }

    return (
		<React.Fragment>
			<Grid container className={classes.root} spacing={1}>
                <Grid item xs={12} className={classes.divButton}>
                <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    onClick={handleChange}>
                    Alterar Dados
                </Button>
				</Grid>
                <Grid item xs={12}>
					<Typography variant="h6">
						Administrativo
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								{dados['servidores_total']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								{dados['servidores_afastamentos_legais']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								{dados['servidores_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Peritos
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								60
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								3
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								9
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Assistente Social
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								{dados['assistentes_total']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								{dados['assistentes_afastado_motivo_legal']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								{dados['assistentes_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Estagiários
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								{dados['estagiarios_total']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								{dados['estagiarios_afastado_motivo_legal']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								{dados['estagiarios_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Temporários
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_total']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_afastado_motivo_legal']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Infraestrutura
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Metragem Administrativo
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_total']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Metragem Perícia Médica
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_afastado_motivo_legal']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Qtd. Guichês
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Qtd. Salas Assis. Social
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Qtd. Salas Perícia
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Qtd. Scanner
							</Typography>
							<Typography component="p" variant="h4">
								{dados['temporarios_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Epi máscara
							</Typography>
							<Typography component="p" variant="h4">
								{dados['epis_mascara'] ? 'Sim' : 'Não'}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Epi luvas
							</Typography>
							<Typography component="p" variant="h4">
								{dados['epis_luvas'] ? 'Sim' : 'Não'}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Epi álcool
							</Typography>
							<Typography component="p" variant="h4">
								{dados['epis_alcool'] ? 'Sim' : 'Não'}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Epi Barreira de proteção
							</Typography>
							<Typography component="p" variant="h4">
								{dados['epis_barreira_de_protecao'] ? 'Sim' : 'Não'}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Epi capote
							</Typography>
							<Typography component="p" variant="h4">
								{dados['epis_capote'] ? 'Sim' : 'Não'}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Epi protetor facial
							</Typography>
							<Typography component="p" variant="h4">
								{dados['epis_protetor_facial'] ? 'Sim' : 'Não'}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			
		</React.Fragment>
    );
}