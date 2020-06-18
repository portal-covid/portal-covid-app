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
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
  
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

    const handleChange = (event) => {
        event.preventDefault();
        history.push('/form', { detail: dados});
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
                                Total de Servidores da unidade
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
								Afastamento Motivo Legal
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
								Afastamento Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								{dados['servidores_grupo_de_risco']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

                <Grid item xs={2}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
                                CEAB
                            </Typography>
                            <Typography component="p" variant="h4">
                                {dados['servidores_ceab']}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={2}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
                                Programa de Gestão/Teletrabalho
                            </Typography>
                            <Typography component="p" variant="h4">
                                {dados['servidores_programa_gestao']}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={2}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
                                Gestores
                            </Typography>
                            <Typography component="p" variant="h4">
                                {dados['servidores_gestores']}
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
                                Total de Servidores da unidade
							</Typography>
							<Typography component="p" variant="h4">
								{dados['pericia_medica_total']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afastamento Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								{dados['pericia_medica_afastado_motivo_legal']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afastamento Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								{dados['pericia_grupo_de_risco']}
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
                                Total de Servidores da unidade
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
								Afastamento Motivo Legal
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
								Afastamento Grupo Risco
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
                                Total de Servidores da unidade
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
								Afastamento Motivo Legal
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
								Afastamento Grupo Risco
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
                                Total de Servidores da unidade
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
								Afastamento Motivo Legal
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
								Afastamento Grupo Risco
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
                <Grid item xs={12} style={{marginBottom: 30}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Área de espera compartilhada entre perícia médica e administrativo?</FormLabel>
                        <RadioGroup aria-label="gender" name="area_compartilhada" value={value} onChange={handleInputChange}>
                            <FormControlLabel value="1" control={<Radio />} label="Sim" />
                            <FormControlLabel value="0" control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
                                Metragem da sala de espera do Administrativo
							</Typography>
							<Typography component="p" variant="h4">
								{dados['metragem_administrativo']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
                                Metragem da sala de espera da Perícia Médica
							</Typography>
							<Typography component="p" variant="h4">
								{dados['metragem_pericia_medica']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Quantidade Guichês
							</Typography>
							<Typography component="p" variant="h4">
								{dados['qtd_guiches']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Quantidade Salas Assis. Social
							</Typography>
							<Typography component="p" variant="h4">
								{dados['qtd_salas_ass']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Quantidade Salas Perícia
							</Typography>
							<Typography component="p" variant="h4">
								{dados['salas_pericia']}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Quantidade Scanner
							</Typography>
							<Typography component="p" variant="h4">
								{dados['qtd_scanner']}
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