import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Auth from "../../shared/auth";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default function SelectUnidades({onChange}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [unidades, setUnidades] = useState(JSON.parse(Auth.getOls()));

    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {

        onChange(value);

    },[value]);



    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        if (active) {
                    setOptions(Object.keys(unidades).map((key) => unidades[key]));
        }

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (

        <>

            <Autocomplete
            id="asynchronous-demo"
            style={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}

            getOptionSelected={(option, value) => option.ol === value.ol}
            getOptionLabel={(option) =>  option.ol + ' - ' + option.nome}
            options={options}
            loading={loading}
            renderOption={(option, { inputValue }) => {
                const matches = match(option.ol + ' - '  + option.nome , inputValue);
                const parts = parse(option.ol + ' - '  + option.nome, matches);

                return (
                    <div>
                        {parts.map((part, index) => (
                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 ,
                                color: part.highlight ? '#FF0218' : '#000' }}>
                {part.text}
              </span>
                        ))}
                    </div>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Unidade"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
       </>
    );
}
