import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import Todo from '../../components/todo/todo';
import * as todoActions from '../../redux/todos';
import { sleep } from '../../utils/utils';

const { array, func } = PropTypes;

class Index extends Component {
  static propTypes = {
    todos: array,
    removeTodo: func,
    restoreTodo: func,
    createTodo: func,
    finishTodo: func
  };

  state = {
    titleInput: '',
    finished: 0
  };

  children() {
    let todos = this.props.todos || [];
    let unfinished = [];
    let finished = [];
    if (todos.length) {
      unfinished = todos.filter((todo) => !todo.finished);
      finished = todos.asMutable()
        .filter((todo) => todo.finished)
        .sort((a, b) => (a.finishedAt < b.finishedAt ? 1 : -1))
        .slice(0, 3);
    }
    return {
      list: unfinished.map((todo) => ({
        component: Todo,
        key: todo.id,
        props: {
          ...todo,
          onRemove: this.handleRemove,
          onRestore: this.handleRestore,
          onFinish: this.handleFinish
        }
      })),
      finished: finished.map((todo) => ({
        component: Todo,
        key: todo.id,
        props: {
          ...todo,
          onRemove: this.handleRemove,
          onRestore: this.handleRestore,
          onFinish: this.handleFinish
        }
      }))
    };
  }

  onUpdate(props) {
    let nextState = {
      finished: 0
    };
    props.todos.forEach((todo) => {
      if (todo.finished) {
        nextState.finished += 1;
      }
    });
    this.setState(nextState);
  }

  async onPullDownRefresh() {
    await sleep(1000);
    wx.showToast({ title: '刷新成功' });
    wx.stopPullDownRefresh();
  }

  handleCreate() {
    let title = this.state.titleInput;
    if (!title) {
      wx.showToast({ title: '请输入任务' });
      return;
    }
    this.props.createTodo({ title });
    this.setState({ titleInput: '' });
  }

  handleInput(e) {
    this.setState({ titleInput: e.detail.value });
  }

  handleRemove = (id) => {
    this.props.removeTodo(id);
  };

  handleFinish = (id) => {
    this.props.finishTodo(id);
  };

  handleRestore = (id) => {
    this.props.restoreTodo(id);
  };

  handleShowFinished() {
    wx.navigateTo({ url: 'finished' });
  }

  handleShowUI() {
    wx.navigateTo({ url: '/pages/ui/index' });
  }
}

export default connect(
  ({ todos }) => ({ todos }),
  (dispatch) => bindActionCreators({
    createTodo: todoActions.create,
    removeTodo: todoActions.remove,
    finishTodo: todoActions.finish,
    restoreTodo: todoActions.restore,
  }, dispatch)
)(Index);
