import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
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

import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PageviewIcon from '@material-ui/icons/Pageview';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useLocation } from 'react-router-dom';
import { fade } from '@material-ui/core/styles';
import ExibirNome from "../components/NomeDaApsNav/ExibirNome";
import AdbIcon from '@material-ui/icons/Adb';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';

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
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
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
    titleNav:{
        flexGrow: 1,

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
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

}));

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isChefia = Auth.isChefia() === "false" ? false : true;
    const isGexSr = Auth.isGexSr() === "false" ? false : true;
    const isPodeDecidir = Auth.isPodeDecidir() === "false" ? false : true;
    const isDesenv = Auth.isDesenv();

    const location = useLocation();
    let data = {};
    if (JSON.parse(Auth.getDetalhes())) {
        data = JSON.parse(Auth.getDetalhes());
    } else {
        data = location.state.detail;
    }

    const handleClickBarra = (event) => {
        history.push('/');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

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
                    <ListItem button key="1">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Principal" />
                    </ListItem>
                </Link>

                <Link
                    to="/"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="1">
                        <ListItemIcon><PageviewIcon /></ListItemIcon>
                        <ListItemText primary="Localizar APS" />
                    </ListItem>
                </Link>

                <Link
                    to="/resumo"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="2">
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Painel" />
                    </ListItem>
                </Link>

                <Link
                    to="/simulador"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="3">
                        <ListItemIcon><FindInPageIcon /></ListItemIcon>
                        <ListItemText primary="Simulador" />
                    </ListItem>
                </Link>


                { isChefia && (
                    <React.Fragment>
                        <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                            Validação
                        </Typography>
                        <Link
                            to="/pessoal"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="4">
                                <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                                <ListItemText primary="Pessoal" />
                            </ListItem>
                        </Link>

                        <Link
                            to="/infra"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="5">
                                <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                                <ListItemText primary="Infraestrutura" />
                            </ListItem>
                        </Link>

                        <Link
                            to="/epi"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="6">
                                <ListItemIcon><LibraryAddIcon /></ListItemIcon>
                                <ListItemText primary="EPI/EPC" />
                            </ListItem>
                        </Link>

                        <Link
                            to="/contratos"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="7">
                                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                                <ListItemText primary="Contratos Essenciais" />
                            </ListItem>
                        </Link>
                    </React.Fragment>
                )}




                 {(isGexSr || isDesenv || isPodeDecidir) &&(
                    <React.Fragment>
                        <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                            Gerência
                        </Typography>
                        <Link
                            to="/gerencia"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="4">
                                <ListItemIcon><HowToRegIcon /></ListItemIcon>
                                <ListItemText primary="Situação das Agências" />
                            </ListItem>
                        </Link>
                    </React.Fragment>

                )}

                { isChefia && (
                    <React.Fragment>
                        <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                            Históricos
                        </Typography>
                        <Link
                            to="/historico_exclusao"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="4">
                                <ListItemIcon><ListAltRoundedIcon /></ListItemIcon>
                                <ListItemText primary="Exclusão de Servidores" />
                            </ListItem>
                        </Link>


                    </React.Fragment>
                )}

                {isDesenv &&(
                    <React.Fragment>
                        <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                            Área de Manutenção
                        </Typography>
                        <Link
                            to="/desenv"
                            style={{ textDecoration: 'none', color: '#757575' }}>
                            <ListItem button key="4">
                                <ListItemIcon><AdbIcon /></ListItemIcon>
                                <ListItemText primary="Ações Gerais" />
                            </ListItem>
                        </Link>
                    </React.Fragment>

                )}




                <List>
                    <Link
                        to="#"
                        onClick={logout}
                        style={{ textDecoration: 'none', color: '#757575' }}>
                        <ListItem button key="8">
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



                    <Typography className={classes.titleNav}  align="center" variant="subtitle1" noWrap>
                        <Hidden only={['xs', 'sm']}>
                            <ExibirNome/>
                        </Hidden>

                    </Typography>
                    <div  onClick={handleClickBarra}>
                        <Button variant="outlined" size="small" color="primary" style={{backgroundColor:"#fff"}}
                                className={classes.margin}>
                            <SearchOutlinedIcon/>

                            <Hidden only={['xs', 'sm']}>
                                Localizar APS
                            </Hidden>


                        </Button>
                    </div>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

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

        </div>
    );
}
