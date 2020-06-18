import React from 'react';
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
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LogoIMG from '../assets/simbolo_inss.svg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import Auth from '../shared/auth';

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
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    iconButton: {
        marginLeft: 'auto',
    }
  }));

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
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

    const home = (event) => {
        event.preventDefault();
        history.push('/');
    }

    const drawer = (
        <div>
            <List>
                <Link
                    to="/"
                    onClick={home}
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                        <ListItemText primary="Validação de dados de Pessoal e Infraestrutura" />
                    </ListItem>
                </Link>

                <Link
                    to="/"
                    onClick={home}
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><LibraryAddIcon /></ListItemIcon>
                        <ListItemText primary="Validação de EPI/EPC" />
                    </ListItem>
                </Link>

                <Link
                    to="/"
                    onClick={home}
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="Home">
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="Validação de Contratos Essenciais" />
                    </ListItem>
                </Link>

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
                    
                    <img src={LogoIMG} width="50px"/>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        <Link to="/" className={classes.link}>
                            Portal COVID-19
                        </Link>
                    </Typography>

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
        </div>
    );
}
