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
      editing: false,
    }

    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
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
    if (this.state.editing === false){
      this.setState({
        tasks: this.state.tasks.concat(this.state.task),
        task: {
          counter: this.state.task.counter + 1,
          text: '',
          id: uniqid(),
        },
      });
    }else{
      const id = this.state.task.id;
      const currTask = this.state.tasks.filter(
        task => task.id === id
      );

      this.setState({
        tasks: this.state.tasks.map((element)=>{
          if (element.id === currTask[0].id){
            element = this.state.task;
          }
          return element;
        }),
        task: {
          counter: this.state.tasks[this.state.tasks.length-1].counter + 1,
          text: '',
          id: uniqid(),
        },
        editing: false,
      });
    }
  }

  removeTask = (e) => {
    e.preventDefault();
    const id = e.target.parentNode.id;
    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return id !== task.id;
      })
    })
  }

  editTask = (e) => {
    e.preventDefault();

    const id = e.target.parentNode.id;
    const index = this.state.tasks.findIndex(
        (task)=>(task.id === id)
    );

    this.setState({
      task: {
        counter: this.state.tasks[index].counter,
        text: this.state.tasks[index].text,
        id: e.target.parentNode.id,
      },
      editing: true,
    });
  }
    

  render() {
    const {task, tasks} = this.state;
    return (
      <div>
        <form>
          <label htmlFor="taskInput">Enter Task</label>
          <input id="taskInput" type="text" value={task.text} onChange={this.handleChange}/>
          <button type="submit" onClick={this.onSubmitTask}>Submit</button>
          <Overview tasks={tasks} remove={this.removeTask} edit={this.editTask}/>
        </form>
      </div>
    );
  }
}

export default App;