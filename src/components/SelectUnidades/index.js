import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Auth from "../../shared/auth";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
            
        },
    },
}));

export default function SelectUnidades({onChange}) {
    const classes = useStyles();

    const options = JSON.parse(Auth.getOls());

    const [value, setValue] = React.useState(options[0]);

    React.useEffect(() => {

        onChange(value.ol);

    },[value]);

    return (


            <div className={classes.root}>
                <Paper variant="outlined" square>
                    <Autocomplete
                        options={options}
                        getOptionLabel={(option) =>  option.ol + ' - ' + option.nome}
                        style={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Unidade" variant="outlined" />}
                        getOptionSelected={(option, value) => option.ol === value.ol}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        renderOption={(option, { inputValue }) => {
                            const matches = match(option.ol + ' - '  + option.nome , inputValue);
                            const parts = parse(option.ol + ' - '  + option.nome, matches);
                            return (
                                <div>
                                    {parts.map((part, index) => {
                                        const style = {
                                            fontWeight : part.highlight ? 700 : 400,
                                            color : part.highlight ? '#FF0218' : '#000'
                                        };
                                        return <span key={index} style={style}>{part.text}</span>;
                                    })}
                                </div>
                            );
                        }}
                    />
                </Paper>
            </div>


    );
}
