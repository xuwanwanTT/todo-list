import React, { Component } from 'react'
import './TodoItem.css'

export default class TodoItem extends Component {
  render(){
    return (
      <div className="TodoItem">
        <label><input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle.bind(this)} />
        </label>
        <span className="title">{this.props.todo.title}</span>
        <span className="btnDelet" onClick={this.delete.bind(this)}>×</span>
      </div>
    )
  }
  toggle(e){
    this.props.onToggle(e,this.props.todo)
  }
  delete(e){
    this.props.onDelete(e,this.props.todo)
  }
}