import React, { Component } from 'react'

export default class SignUpForm extends Component {
  render(){
    return (
      <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/*注册*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.props.formData.username} placeholder="your name"
            onChange={this.props.onChange.bind(this,'username')} />
        </div>
        <div className="row">
          <label>邮箱</label>
          <input type="email" value={this.props.formData.email} placeholder="Re. name@email.com"
            onChange={this.props.onChange.bind(this,'email')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.props.formData.password} placeholder="password"
            onChange={this.props.onChange.bind(this,'password')} />
        </div>
        <div className="row action">
          <button type="submit">注册</button>
        </div>
      </form>
    )
  }
}