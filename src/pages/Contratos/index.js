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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: 30
  },
}));

export default function Infra(data) {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const formData = {
        limpeza_conservacao: data['contratos.limpeza_conservacao'],
        vigilancia_ostensiva: data['contratos.vigilancia_ostensiva'],
        vigilancia_eletronica: data['contratos.vigilancia_eletronica'],
        manutencao_predial : data['contratos.manutencao_predial'],
        manutencao_ar_condicionado : data['contratos.manutencao_ar_condicionado'],
        manutencao_elevadores : data['contratos.elevadores'],



    }
	const [form, setForm] = useState(formData);
    const [value, setValue] = useState();
    const [age, setAge] = useState();
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
                           Contratos Essenciais
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{marginTop: 30}}>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Limpeza e conservação</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    
                                </MenuItem>
                                <MenuItem value={10}>SIM</MenuItem>
                                <MenuItem value={20}>Não</MenuItem>
                                <MenuItem value={30}>Não se Aplica</MenuItem>
                            </Select>
                        </FormControl>


                        <br />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Vigilância Ostensiva</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Máscara</em>
                                </MenuItem>
                                <MenuItem value={10}>SIM</MenuItem>
                                <MenuItem value={20}>Não</MenuItem>
                                <MenuItem value={30}>Não se Aplica</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Vigilância Eletrônica</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Alcool</em>
                                </MenuItem>
                                <MenuItem value={10}>SIM</MenuItem>
                                <MenuItem value={20}>Não</MenuItem>
                                <MenuItem value={30}>Não se Aplica</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Manutenção Predial</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Máscara</em>
                                </MenuItem>
                                <MenuItem value={10}>SIM</MenuItem>
                                <MenuItem value={20}>Não</MenuItem>
                                <MenuItem value={30}>Não se Aplica</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Manutenção ar condicionado</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Máscara</em>
                                </MenuItem>
                                <MenuItem value={10}>SIM</MenuItem>
                                <MenuItem value={20}>Não</MenuItem>
                                <MenuItem value={30}>Não se Aplica</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Manutenção de elevadores</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Máscara</em>
                                </MenuItem>
                                <MenuItem value={10}>SIM</MenuItem>
                                <MenuItem value={20}>Não</MenuItem>
                                <MenuItem value={30}>Não se Aplica</MenuItem>
                            </Select>
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