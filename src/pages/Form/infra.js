import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const formData = {
    admTotal: '',
    admMotivoLegal: '',
    admGrupoRisco: '',
    admCEAP: '',
    admCEAB: '',
    peritosTotal: '',
    peritosMotivoLegal: '',
    peritosGrupoRisco: '',
    assistenteTotal: '',
    assistenteMotivoLegal: '',
    assistenteGrupoRisco: '',
    estagiariosTotal: '',
    estagiariosMotivoLegal: '',
    estagiariosGrupoRisco: '',
    temporariosTotal: '',
    temporariosMotivoLegal: '',
    temporariosGrupoRisco: '',
}

export default function Infra() {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();
	const [form, setForm] = useState(formData);
	const [value, setValue] = useState();

	const handleInputChange = (event) => {
		setForm({...form,
		[event.target.name]: event.target.value
		});
	}

	const handleChange = (event) => {
		setValue(event.target.value);
	};

    async function handleSubmit(event) {
	}

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className={classes.root}>
                <Grid container className={classes.root} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Infraestrutura
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: 30}}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Área de espera compartilhada entre perícia médica e administrativo?</FormLabel>
							<RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
								<FormControlLabel value="1" control={<Radio />} label="Sim" />
								<FormControlLabel value="0" control={<Radio />} label="Não" />
							</RadioGroup>
						</FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Metragem área de espera da Perícia Médica
                            </Typography>
                            <TextField id="motivo-legal-adm" 
                                value={form.admMotivoLegal} 
                                name="admMotivoLegal"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
					<Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de salas de assistente social
                            </Typography>
                            <TextField id="ceab-adm" 
                                value={form.admCEAB}
                                name="admCEAB"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Metragem área de espera do Administrativo
                            </Typography>
                            <TextField id="ceap-adm" 
                                value={form.admCEAP}
                                name="admCEAP"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Quantidade de consultórios
                            </Typography>
                            <TextField id="grupo-risco-adm" 
                                value={form.admGrupoRisco}
                                name="admGrupoRisco"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
					<Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de guichês
                            </Typography>
                            <TextField id="ceab-adm" 
                                value={form.admCEAB}
                                name="admCEAB"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
				<Grid container className={classes.root} spacing={1} style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Button type="submit" size="large" variant="contained" color="primary">
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
			</form>
        </React.Fragment>
    );
}