import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import Auth from '../../shared/auth';
import { useSnackbar } from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SelectUnidades from '../../components/SelectUnidades'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Grid from "@material-ui/core/Grid/Grid";
import MensagemBoasVindas from "../../components/MensagemBoasVindas";
import Breadcrumbs from "@material-ui/core/Breadcrumbs/Breadcrumbs";
import NavigateNextIcon from "@material-ui/core/SvgIcon/SvgIcon";
import PageviewIcon from '@material-ui/icons/Pageview';
import Chip from "@material-ui/core/Chip/Chip";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%'
    },
}))(Chip);

 

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	title: {
		marginTop: 30,
		marginBottom: 30
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '100%',
		marginTop: 30
	},
	select: {
		backgroundColor: '#fff'
	},
	divButton: {
		width: '100%',
		textAlign: 'center'
	},
	button: {
		marginTop: 10,
	},
    loading: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    }
}));

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const history = useHistory();
	const [unidade, setUnidade] = useState('');
	const [unidades, setUnidades] = useState(JSON.parse(Auth.getOls()));
	const token = Auth.getToken();
    const [loading, setLoading] = useState(false);


    const handleChange = (value) => {
        setUnidade(value);

    };


    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        if (!unidade) {
            setLoading(false);
            return false;
        }

		let data = {
			"unidades" : [unidade],
			"tipoRelatorio": "RecursosUnidades"
		};

		try {
            await api.post('relatorio', data, { 
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                setLoading(false);
                if(response.data.dados.length) {
					localStorage.setItem('olAtual', unidade);
                    localStorage.setItem('detalhes', JSON.stringify(response.data.dados[0]));
                    history.push('/info', { detail: response.data.dados[0]});
                } else {
                    enqueueSnackbar('Não foi encontrado dados para esta unidade!', { 
                        variant: 'info',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        }
                    });
                }
            });
        } catch(error) {
            setLoading(false);
            enqueueSnackbar('Erro ao retornar os dados!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
        }
	}

    return (
		<React.Fragment>
            <CssBaseline />
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                            <StyledBreadcrumb
                                color="primary"
                                aria-current="page"
                                component="p"
                                label="Localizar APS"
                                icon={<PageviewIcon fontSize="small"/>}
                            />
                        </Breadcrumbs>
                    </Grid>
                </Grid>

            </Grid>


                <Grid>
                    <Container>

                        <MensagemBoasVindas />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <SelectUnidades onChange={handleChange}/>
                        </FormControl>
                        <div className={classes.divButton}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleSubmit}>
                                Pesquisar
                            </Button>
                        </div>
                        <div className={classes.loading}>
                            { loading && (
                                <CircularProgress />
                            )}
                        </div>
					</Container>
				</Grid>


		</React.Fragment>
    );
}