import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ConfirmDialog(props) {
    const theme = useTheme();
    const { title, children, open, onClose, onConfirm } = props;
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (

            <Dialog fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="alert-decisao"
                aria-describedby="alerta-decisao"
            >

                <DialogTitle id="confirma-decisao"> {title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>

                    <Button     onClick={(e) => {
                        onClose();
                        onConfirm(e);
                    }}
                                color="primary" autoFocus>
                        Sim
                    </Button>
                    <Button    onClick={onClose} color="primary">
                        Não
                    </Button>
                </DialogActions>
            </Dialog>

    );
}
