import React, { Component } from 'react'
import './UserDialog.css'
import { signUp, signIn } from './leanCloud'

export default class UserDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp',
      formData: {
        username: '',
        email: '',
        password: '',
      }
    }
  }

  switch(e){
    this.setState({
      selected: e.target.value
    })
  }

  signUp(e){
    e.preventDefault()
    let { username, email, password } = this.state.formData
    let success = (user)=>{
      this.props.onSignUp.call(null,user)
    }
    let error = (error)=>{
      if(error.code === 202){
        alert('用户名已存在')
      }else if(error.code === 203){
        alert('邮箱已存在')
      }
    }
    signUp(username, email, password, success, error)
  }

  signIn(e){
    e.preventDefault()
    let { username, email, password } = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null,user)
    }
    let error = (error)=>{
      if(error.code === 210){
        alert('用户名或密码错误')
      }else if(error.code === 211){
        alert('用户名不存在')
      }
    }
    signIn(username, email, password, success, error)
  }

  changeFormData(key,e){
    //深拷贝,不能直接修改state,要用setState
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }

  render(){
    let signUpForm = (
      <form className="signUp" onSubmit={this.signUp.bind(this)}> {/*注册*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.state.formData.username} placeholder="your name"
            onChange={this.changeFormData.bind(this,'username')} />
        </div>
        <div className="row">
          <label>邮箱</label>
          <input type="email" value={this.state.formData.email} placeholder="Re. name@email.com"
            onChange={this.changeFormData.bind(this,'email')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.state.formData.password} placeholder="password"
            onChange={this.changeFormData.bind(this,'password')} />
        </div>
        <div className="row action">
          <button type="submit">注册</button>
        </div>
      </form>
    )

    let signInForm = (
      <form className="signIn" onSubmit={this.signIn.bind(this)}> {/*登录*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.state.formData.username} placeholder="your name or email"
            onChange={this.changeFormData.bind(this,'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.state.formData.password} placeholder="password"
            onChange={this.changeFormData.bind(this,'password')} />
        </div>
        <div className="row action">
          <button type="submit">登录</button>
        </div>
      </form>      
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav onChange={this.switch.bind(this)}>
            <label>
              <input type="radio" value="signUp"
                checked={this.state.selected === 'signUp'}
                onChange={this.switch.bind(this)} />注册</label>
            <label>
              <input type="radio" value="signIn"
                checked={this.state.selected === 'signIn'}
                onChange={this.switch.bind(this)} />登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ? signUpForm : null}
            {this.state.selected === 'signIn' ? signInForm : null}
          </div>
        </div>
      </div>
    )
  }
}