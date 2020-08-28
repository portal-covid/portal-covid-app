import React, { Component } from "react";
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux'

import { Creators as TodoActions } from "../../redux/store/ducks/todos";


class NomeDaApsNav extends Component {

    render() {
        const {todos,updateNome} = this.props;

        return (
            <div>

                {
                    todos.modules.map(module => (
                        <div key={module.id}>
                            <strong>{module.title}</strong>
                            <ul>
                                {
                                    module.lessons.map(lesson => (
                                        <li key={lesson.id}>lesson.title
                                            <button onClick={() => updateNome(module, lesson)}>
                                                Selecionar</button>
                                        </li>

                                    ))
                                }
                            </ul>
                        </div>

                    ))

                }


            </div>
        );
    }
}




const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TodoActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NomeDaApsNav);
