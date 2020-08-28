import React from 'react'
import { connect } from 'react-redux';


const ExibirNome = ({unidade}) => (
    <div>
        {unidade}
    </div>
);

export default connect(state =>({
    unidade : state.dadosUnidade.text || ''
}))(ExibirNome);