import React, { Component } from 'react'

export default class TodoInput extends Component {
  render(){
    return <input type="text" value={this.props.content} placeholder="按ENTER键添加todo"
      onChange={this.changeTitle.bind(this)}
      onKeyPress={this.submit.bind(this)} />
      //这里在执行事件时，是按照submit.call()方法调用函数
      //此时的submit函数的this不是指向"this.props"中的this
      //所以需要bind(this)
  }
  submit(e){
    if(e.key === 'Enter'){
      this.props.onSubmit(e)
    }
  }
  changeTitle(e){
    this.props.onChange(e)
  }
}