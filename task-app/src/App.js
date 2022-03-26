import React, { Component } from 'react';
import uniqid from 'uniqid';
import Overview from './components/Overview';

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: { 
        counter: 1,
        text: '',
        id: uniqid(),
      },
      tasks: [],
    }

    this.removeTask = this.removeTask.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      task: {
        counter: this.state.task.counter,
        text: e.target.value,
        id: this.state.task.id,
      }
    });
  }

  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        counter: this.state.task.counter + 1,
        text: '',
        id: uniqid(),
      },
    });
  }

  removeTask = (e) => {
    e.preventDefault();
    
    const id = e.target.parentNode.id;
    console.log(e.target);
    console.log(e.target.parentNode.parentNode);
    // console.log(id);
    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return id !== task.id;
      })
    })
  }

  render() {
    const {task, tasks} = this.state;
    return (
      <div>
        <form>
          <label htmlFor="taskInput">Enter Task</label>
          <input id="taskInput" type="text" value={task.text} onChange={this.handleChange}/>
          <button type="submit" onClick={this.onSubmitTask}>Submit</button>
          <Overview tasks={tasks} remove={this.removeTask}/>
        </form>
      </div>
    );
  }
}

export default App;