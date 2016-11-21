import { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import Todo from '../../components/todo/todo';
import * as todoActions from '../../redux/todos';

const { array } = PropTypes;

class Finished extends Component {
  static propTypes = {
    todos: array
  };

  static defaultProps = {
    todos: []
  };

  children() {
    let todos = this.props.todos;
    let finished = [];
    if (todos.length) {
      finished = todos.asMutable().filter((todo) => todo.finished).sort((a, b) => (a.finishedAt < b.finishedAt ? 1 : -1));
    }
    return {
      todos: finished.map((todo) => ({
        component: Todo,
        key: todo.id,
        props: {
          ...todo,
          onRemove: this.handleRemove,
          onRestore: this.handleRestore
        }
      }))
    };
  }

  handleRemove = (id) => {
    this.props.removeTodo(id);
  };

  handleRestore = (id) => {
    this.props.restoreTodo(id);
  };
}

export default connect(
  ({ todos }) => ({ todos }),
  (dispatch) => bindActionCreators({
    removeTodo: todoActions.remove,
    restoreTodo: todoActions.restore,
  }, dispatch)
)(Finished);
