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
import Auth from '../../shared/auth';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Infra(data) {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const formData = {
        area_compartilhada: data['area_compartilhada'],
        metragem_administrativo: data['metragem_administrativo'],
        metragem_pericia_medica: data['metragem_pericia_medica'],
        qtd_guiches: data['qtd_guiches'],
        qtd_salas_ass: data['qtd_salas_ass'],
        salas_pericia: data['salas_pericia'],
        qtd_scanner: data['qtd_scanner'],
    }
	const [form, setForm] = useState(formData);
    const [value, setValue] = useState();
    const token = Auth.getToken();

	const handleInputChange = (event) => {
		setForm({...form,
		[event.target.name]: event.target.value
		});
	}

	const handleChange = (event) => {
		setValue(event.target.value);
	};

    async function handleSubmit(event) {
        event.preventDefault();

        let resp = {
            _id: data['_id'],
			tipoOperacao: "AtualizarDadosDeInfraestrutura",
        };
        resp['dados'] = form;

        try {
            await api.post('unidades', resp, { 
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                enqueueSnackbar('Dados salvos com sucesso!', { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            });
        } catch(error) {
            enqueueSnackbar('Erro ao salvar os dados!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        }
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
							<RadioGroup aria-label="gender" name="area_compartilhada" value={value} onChange={handleInputChange}>
								<FormControlLabel value="1" control={<Radio />} label="Sim" />
								<FormControlLabel value="0" control={<Radio />} label="Não" />
							</RadioGroup>
						</FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Metragem da sala de espera do Administrativo
                            </Typography>
                            <TextField id="metragem_administrativo" 
                                value={form.metragem_administrativo}
                                name="metragem_administrativo"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Metragem da sala de espera da Perícia Médica
                            </Typography>
                            <TextField id="metragem_pericia_medica" 
                                value={form.metragem_pericia_medica} 
                                name="metragem_pericia_medica"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
					<Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de salas de assistente social
                            </Typography>
                            <TextField id="qtd_salas_ass" 
                                value={form.qtd_salas_ass}
                                name="qtd_salas_ass"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
                                Quantidade de consultórios
                            </Typography>
                            <TextField id="salas_pericia" 
                                value={form.salas_pericia}
                                name="salas_pericia"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
					<Grid item xs={12} sm={4}>
                        <FormControl>
                            <Typography variant="subtitle2" gutterBottom>
								Quantidade de guichês
                            </Typography>
                            <TextField id="qtd_guiches" 
                                value={form.qtd_guiches}
                                name="qtd_guiches"
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