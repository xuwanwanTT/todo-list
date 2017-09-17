import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'       //将输入框封装成TodoInput组件
import TodoItem from './TodoItem'         //将每条待办封装成TodoItem组件
import 'normalize.css'                    //CSS reset的替代方案
import './reset.css'                        //手动reset
import * as localStore from './localStore'    //封装localStorage

class App extends Component {
  constructor(props){                   //设置state的初始值
    super(props)                       //super(),相当于引入this
    this.state = {                    
      newTodo: '',                //newTodo变量存储输入框中的内容
      todoList: localStore.load('todoList') || [
        {id:1,title:"吃饭"},
        {id:2,title:"睡觉"},
        {id:3,title:"学前端"}
      ]   //todoList变量存储输入的所有todo
    }
  } 
  render() {                        //渲染

    let todos = this.state.todoList
      .filter((item)=>!item.deleted)
      .map((item,index)=>{
        return (
          <li key={index}>
            <TodoItem todo={item}
              onToggle={this.toggle.bind(this)}
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
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }

  componentDidUpdate(){
    localStore.save('todoList',this.state.todoList)
  }   //理解“组件更新 == 数据更新” componentDidUpdate会在组件更新后调用

  toggle(e,todo){
    todo.status = ((todo.status === 'completed') ? ('') : ('completed'))  
    //这里的括号只是提示运算顺序，可以去除，语法(条件)?(结果1):(结果2)，如果条件满足，返回结果1，否则结果2
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