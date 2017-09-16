import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'       //将输入框变成一个组件

class App extends Component {
  constructor(props){                   //设置state的初始值
    super(props)                       //super(),相当于引入this
    this.state = {                    
      newTodo: 'test',                //newTodo变量存储输入框中的内容
      todoList: [                   
        {id:1,title:'第一个待办'}     //todoList变量存储输入的所有todo
      ]
    }
  } 
  render() {                        //渲染

    let todos = this.state.todoList.map((item,index)=>{
      return <li>{item.title}</li>
    })
    
    return (                        //return一段XML，如果是多行需要用小括号括起来
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">  
          <TodoInput content={this.state.newTodo} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;                //模块化，绑定接口
