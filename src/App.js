import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'       //将输入框封装成TodoInput组件
import TodoItem from './TodoItem'         //将每条待办封装成TodoItem组件
import 'normalize.css'                    //CSS reset的替代方案
import './reset.css'                      //手动reset
import UserDialog from './UserDialog'
import { getCurrentUser, signOut, TodoModel } from './leanCloud' //leanCloud的API，获取登录用户名

class App extends Component {
  constructor(props){                   //设置state的初始值
    super(props)                       //super(),相当于引入this
    this.state = {
      user: getCurrentUser() || {},                    
      newTodo: '',                //newTodo变量存储输入框中的内容
      todoList: []   //todoList变量存储输入的所有todo
    }
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user,(todos)=>{
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
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
        <h1>{this.state.user.username || "我"}的Todo
          {this.state.user.id ? <div className="btnOut" onClick={this.signOut.bind(this)}>登出</div> : null}
        </h1>
        <div className="inputWrapper">  
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ?
          null :
          <UserDialog
            onSignUp={this.onSignInOrSignUp.bind(this)}
            onSignIn={this.onSignInOrSignUp.bind(this)} />}
      </div>
    )
  }

  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignInOrSignUp(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
    window.location.reload()
  }

  componentDidUpdate(){
    
  }   //理解“组件更新 == 数据更新” componentDidUpdate会在组件更新后调用

  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = ((todo.status === 'completed') ? ('') : ('completed'))  
    //这里的括号只是提示运算顺序，可以去除，语法(条件)?(结果1):(结果2)，如果条件满足，返回结果1，否则结果2
    TodoModel.update(todo,()=>{
      this.setState(this.state)
    },(error)=>{
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    },(error)=>{
      console.log(error)
    })
  }
  delete(event,todo){
    TodoModel.destroy(todo.id,()=>{
      todo.deleted = true
      this.setState(this.state)
    })
  }
}

export default App;                //模块化，绑定接口