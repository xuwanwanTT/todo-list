import React, { Component } from 'react'
import './UserDialog.css'
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

export default class UserDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        username: '',
        email: '',
        password: '',
      }
    }
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
    if(this.state.formData.username.length < 3){
      alert('用户名至少为三个字符')
      return
    }else if(!this.state.formData.email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)){
      alert('请输入正确的邮箱')
      return
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
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ?
            <SignInOrSignUp
              formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)}
            /> :
            <ForgotPasswordForm
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)}
            />}
        </div>
      </div>
    )
  }
  
  showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }

  returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }

  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
}