import React from 'react';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

function Dica(props) {


        return (
            <React.Fragment>

                <HtmlTooltip
                    title={
                        <React.Fragment>
                            {props.texto}
                        </React.Fragment>
                    }
                >
                    <HelpOutlineOutlinedIcon color="primary" />
                </HtmlTooltip>


            </React.Fragment>
        );




}

export default Dica;