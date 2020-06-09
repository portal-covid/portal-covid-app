import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Equipamentos() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}