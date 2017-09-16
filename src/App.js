import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'       //将输入框封装成TodoInput组件
import TodoItem from './TodoItem'         //将每条待办封装成TodoItem组件
import 'normalize.css'                    //CSS reset的替代方案
import './reset.css'                        //手动reset

class App extends Component {
  constructor(props){                   //设置state的初始值
    super(props)                       //super(),相当于引入this
    this.state = {                    
      newTodo: '',                //newTodo变量存储输入框中的内容
      todoList: []               //todoList变量存储输入的所有todo
    }
  } 
  render() {                        //渲染

    let todos = this.state.todoList
      .filter((item)=>!item.deleted)
      .map((item,index)=>{
        console.log(1)
        return (
          <li key={index}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
          </li>
        )
      })
    
    return (                        //return一段XML，如果是多行需要用小括号括起来
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">  
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  delete(event,todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;                //模块化，绑定接口

let id = 0

function idMaker(){
  id += 1
  return id
}