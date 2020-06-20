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

export default function Epi(data) {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const formData = {
        epis_mascara: data['epi.mascara'],
        epis_luvas: data['epi.luvas'],
        epis_alcool: data['epi.alcool'],
        epis_gorro: data['epi.gorro'],
        epis_capote: data['epi.capote'],
        epis_protetor_facial: data['epis.protetor_facial'],

        epcs_barreira_de_protecao: data['epc.barreira_de_protecao'],
        epcs_marcacao_solo_interna_externa: data['epc.marcacao_solo_interna_externa'],
        epcs_inutilizacao_assentos: data['epc.inutilizacao_assentos'],




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
                            EPI/EPC
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{marginTop: 30}}>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Máscaras</InputLabel>
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
                            <InputLabel id="demo-simple-select-filled-label">Luvas</InputLabel>
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
                            <InputLabel id="demo-simple-select-filled-label">Alcool</InputLabel>
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
                            <InputLabel id="demo-simple-select-filled-label">Capote(avental)</InputLabel>
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
                            <InputLabel id="demo-simple-select-filled-label">Protetor Facial</InputLabel>
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
                            <InputLabel id="demo-simple-select-filled-label">Gorro</InputLabel>
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
                         Titulo EPC
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Barra de Proteção</InputLabel>
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
                        <br/>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Marcação de solo interna/externa</InputLabel>
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
                        <br/>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Inutilização de assentos</InputLabel>
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