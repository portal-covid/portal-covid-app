import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { useState } from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import {emphasize, withStyles} from '@material-ui/core/styles';


import {Link, useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


import {useSnackbar} from 'notistack';
import {  useLocation } from 'react-router-dom';

import CapacidadeAtendimento from './CapacidadeAtendimento'




const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip);

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}


var cardStyle = {
    minHeight: '13vw'
}


const rows = [
    createData('Administrativo', 305, 3.7, 67, 4.3, 4, 5, 6),
    createData('Assistente Social', 452, 25.0, 51, 4.9, 0, 0, 0),
    createData('Perícia Médica', 262, 16.0, 24, 6.0, 0, 0, 0),
    createData('Estagiários', 159, 6.0, 24, 4.0, 0, 0, 0),
    createData('Temporários', 356, 16.0, 49, 3.9, 0, 0, 0),

];
const rowsEPIEPC = [
    createData('Álcool', 'EPI' , '','X' ,''),
    createData('Capote', 'EPI','X','' ,''),
    createData('Luvas', 'EPI','X','' ,''),
    createData('Máscara', 'EPI', '','X' ,''),
    createData('Protetor Facial','EPI', 'X','' ,''),
    createData('Gorro','EPI','' ,'X'),
    createData('Barreira de proteção','EPC','' ,'X'),
    createData('Marcação de solo interna e externa','EPC','' ,'X'),
    createData('Inutilização de assentos','EPC','' ,'X'),


];
const rowsContratos = [
    createData('Limpeza e conservação' , '','X' ,''),
    createData('Vigilância ostensiva ' , '','X' ,''),
    createData('Vigilância eletrônica ' , '','X' ,''),
    createData('Manutenção predial ' , '','X' ,''),
    createData('Manutenção ar condicionado ' , '','X' ,''),
    createData('Manutenção de elevadores ' , '','X' ,''),



];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'categoria', numeric: false, disablePadding: true, label: 'Categoria'},
    {id: 'total', numeric: true, disablePadding: false, label: 'Total'},
    {id: 'grupo', numeric: true, disablePadding: false, label: 'Grupo de Risco'},
    {id: 'afastamento', numeric: true, disablePadding: false, label: 'Afastamento Legal'},
    {id: 'CEAB', numeric: true, disablePadding: false, label: 'CEAB'},
    {id: 'ProgramadeGestao', numeric: true, disablePadding: false, label: 'Programa de Gestão'},
    {id: 'Gestores', numeric: true, disablePadding: false, label: 'Gestores'},
    {id: 'retorno', numeric: true, disablePadding: false, label: 'Retorno'},
];



const headCellsEPIEPC = [
    {id: 'itemepiepc', numeric: false, disablePadding: true, label: 'Item'},
    {id: 'tipoEpiEPC', numeric: true, disablePadding: false, label: 'Tipo'},
    {id: 'RespostaSim', numeric: true, disablePadding: false, label: 'SIM'},
    {id: 'RespostaNao', numeric: true, disablePadding: false, label: 'NÃO'},
    {id: 'RespostaNaoSeAplica', numeric: true, disablePadding: false, label: 'NÃO SE APLICA'}
];



function EnhancedTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableHeadEPIEPC(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCellsEPIEPC.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                    <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                     </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

EnhancedTableHeadEPIEPC.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        maxWidth: 752,

    },

    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));


const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selecionados
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Dados de Pessoal
                </Typography>
            )}


        </Toolbar>
    );
};

const EnhancedTableToolbarContratos = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selecionados
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Contratos
                </Typography>
            )}


        </Toolbar>
    );
};
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const EnhancedTableToolbarEpiEPC = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selecionados
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    EPI/EPC
                </Typography>
            )}


        </Toolbar>
    );
};
EnhancedTableToolbarEpiEPC.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    listBg: {},
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page] = React.useState(0);
    const location = useLocation();
    const [dados, setDados] = useState(location.state.detail);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;



    return (
        <React.Fragment>


            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Principal"
                            icon={<HomeIcon fontSize="small"/>}
                            onClick={handleClick}
                        />
                    </Breadcrumbs>
                </Grid>

                <CapacidadeAtendimento classes={classes} {...dados}></CapacidadeAtendimento>








                <Grid item xs={12}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <EnhancedTableToolbar numSelected={selected.length}/>
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    aria-label="enhanced table"
                                >
                                    <EnhancedTableHead
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.name)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">

                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row"
                                                                   padding="none">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                        <TableCell align="right">{row.protein}</TableCell>
                                                        <TableCell align="right">0</TableCell>
                                                        <TableCell align="right">0</TableCell>
                                                        <TableCell align="right">0</TableCell>
                                                    </TableRow>
                                                );
                                            })}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        <h2>Infraestrutura</h2>
                    </Typography>
                </Grid>

                <Grid item xs={12} className={classes.listBg}>
                    <div className={classes.root}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>

                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h6" className={classes.title}>
                                            Áreas de Espera
                                        </Typography>
                                        <div className={classes.demo}>
                                            <List>


                                                <ListItem>
                                                    <ListItemText primary="Área de espera compartilhada:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="não"/>
                                                    </ListItemSecondaryAction>

                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="Metragem Perícia Médica:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="30"/>
                                                    </ListItemSecondaryAction>

                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="Metragem Administrativo:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="20.6"/>
                                                    </ListItemSecondaryAction>

                                                </ListItem>

                                            </List>
                                        </div>
                                    </CardContent>
                                </Card>

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h6" className={classes.title}>
                                            Salas e Guichês
                                        </Typography>
                                        <div className={classes.demo}>
                                            <List>


                                                <ListItem>
                                                    <ListItemText primary="Consultórios:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="1"/>
                                                    </ListItemSecondaryAction>

                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="Salas assistente social:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="30"/>
                                                    </ListItemSecondaryAction>

                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="Guichês  administrativo:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="20.6"/>
                                                    </ListItemSecondaryAction>

                                                </ListItem>

                                            </List>
                                        </div>
                                    </CardContent></Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h6" className={classes.title}>
                                            Equipamentos
                                        </Typography>
                                        <div className={classes.demo}>
                                            <List>
                                                <ListItem>
                                                    <ListItemText primary="Scanners INSS Digital:"/>
                                                    <ListItemSecondaryAction>
                                                        <ListItemText primary="0"/>
                                                    </ListItemSecondaryAction>
                                                </ListItem>


                                            </List>

                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>


                        </Grid>

                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        <h2>EPI/EPC</h2>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <EnhancedTableToolbarEpiEPC numSelected={selected.length}/>
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    aria-label="enhanced table"
                                >
                                    <EnhancedTableHeadEPIEPC
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rowsEPIEPC.length}
                                    />
                                    <TableBody>
                                        {stableSort(rowsEPIEPC, getComparator(order, orderBy))
                                            .slice(page * 30, page * 30 + 30)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.name)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">

                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row"
                                                                   padding="none">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                        <TableCell align="right">{row.protein}</TableCell>

                                                    </TableRow>
                                                );
                                            })}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>

                    </div>
                </Grid>


                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        <h2>Contratos Essenciais</h2>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <EnhancedTableToolbarContratos numSelected={selected.length}/>
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    aria-label="enhanced table"
                                >
                                    <EnhancedTableHeadEPIEPC
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rowsEPIEPC.length}
                                    />
                                    <TableBody>
                                        {stableSort(rowsContratos, getComparator(order, orderBy))
                                            .slice(page * 30, page * 30 + 30)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.name)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">

                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row"
                                                                   padding="none">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                        <TableCell align="right">{row.protein}</TableCell>

                                                    </TableRow>
                                                );
                                            })}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>

                    </div>
                </Grid>
            </Grid>


        </React.Fragment>
    );
}
