import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    }
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => console.error(err))
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  handleAdd = (name) => {
    axios.post(URL, { name })
    .then(res => {
      this.fetchAllTodos()
    })
    .catch(err => console.error(err))
  }

  handleClear = () => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter(todo => {
        return todo.completed === false
      })
    })
  }

  handleToggle = (id) => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.fetchAllTodos()
    })
    .catch(err => console.error(err))
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h1>Todos</h1>
        <TodoList handleToggle={this.handleToggle} todos={todos}/>
        <Form handleAdd={this.handleAdd}/>
        <button onClick={this.handleClear}>Clear</button>
      </div>
    )
  }
}
