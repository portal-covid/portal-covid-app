import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import ListItemText from '@material-ui/core/ListItemText';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LogoIMG from '../assets/simbolo_inss.svg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import Auth from '../shared/auth';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../services/api';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '100%'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: 'calc(100% - 240px)'
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    title: {
        marginLeft: 10,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
    formControl: {
        marginLeft: 'auto',
        minWidth: 120,
        width: 150,
        [theme.breakpoints.up('sm')]: {
            width: 300,
        },
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
    select: {
        color: '#fff',
        '&:before': {
            borderColor: '#fff',
        },
        '&:after': {
            borderColor: '#fff',
        }
    },
    icon: {
        fill: '#fff',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    itemMenu: {
        color: '#0d5fb6',
        marginLeft: 10,
    }
  }));

export default function Main() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [unidade, setUnidade] = useState('');
    const [unidades, setUnidades] = useState(JSON.parse(Auth.getOls()));
    const token = Auth.getToken();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUnidade(Auth.getOlAtual());
	}, [setUnidades]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    async function handleChange(event) {
        setUnidade(event.target.value);
        setLoading(true);
        
        let data = {
			"unidades" : [event.target.value],
			"tipoRelatorio": "RecursosUnidades"
		};

		try {
            await api.post('relatorio', data, { 
				headers: {"Authorization" : "Bearer " + token }
			}).then(response => {
                if(response.data.dados.length) {
                    localStorage.setItem('olAtual', event.target.value);
                    localStorage.setItem('detalhes', JSON.stringify(response.data.dados[0]));
                    history.push('/info', { detail: response.data.dados[0]});
                    window.location.reload(false);
                } else {
                    setLoading(false);
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
            console.log(error);
            enqueueSnackbar('Erro ao retornar os dados!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
        }
	};

    const logout = (event) => {
        event.preventDefault();
        handleClose();
        Auth.logout();
        history.push('/');
    }

    const drawer = (
        <div>
            <List>
                <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                    Menu
                </Typography>
                <Link
                    to="/info"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Principal" />
                    </ListItem>
                </Link>

                <Link
                    to="/resumo"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Painel Resumo" />
                    </ListItem>
                </Link>

                <Link
                    to="/simulador"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><FindInPageIcon /></ListItemIcon>
                        <ListItemText primary="Simulador" />
                    </ListItem>
                </Link>

                <Link
                    to="/capacidade"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><LibraryAddCheckIcon /></ListItemIcon>
                        <ListItemText primary="Capacidade Operacional" />
                    </ListItem>
                </Link>

                {Auth.isChefia() &&

                <>
                <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                    Validação
                </Typography>
                <Link
                    to="/pessoal"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                        <ListItemText primary="Pessoal" />
                    </ListItem>
                </Link>

                <Link
                    to="/infra"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                        <ListItemText primary="Infraestrutura" />
                    </ListItem>
                </Link>

                <Link
                    to="/epi"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><LibraryAddIcon /></ListItemIcon>
                        <ListItemText primary="EPI/EPC" />
                    </ListItem>
                </Link>

                <Link
                    to="/contratos"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="Contratos Essenciais" />
                    </ListItem>
                </Link>
                </>

                }


                <List>
                    <Link
                        to="#"
                        onClick={logout}
                        style={{ textDecoration: 'none', color: '#757575' }}>
                        <ListItem button key="Sair">
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItem>
                    </Link>
                </List>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <img aria-hidden="true" alt="Logotipo do INSS" src={LogoIMG} width="50px"/>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        <Link to="/" className={classes.link}>
                            Portal COVID-19
                        </Link>
                    </Typography>

                    <FormControl className={classes.formControl}>
                        <Select
                            className={classes.select}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={unidade}
                            onChange={handleChange}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            {unidades.map((unidade) => (
                                <MenuItem key={unidade.ol} value={unidade.ol}>
                                {unidade.ol} - {unidade.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                        className={classes.iconButton}
                    >
                        <AccountCircle />
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {/*<MenuItem onClick={handleClose}>Perfil</MenuItem>*/}
                        <MenuItem onClick={logout}>Sair</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon/>
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>  
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <main>
                    <MainRoutes />
                </main>
            </div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
