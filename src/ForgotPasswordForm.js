import React, { Component } from 'react'

export default class ForgotPasswordForm extends Component {
  render(){
    return (
      <div className="forgotPassword">
        <h3>
          重置密码
        </h3>
        <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录 */}
          <div className="row">
            <input type="email" value={this.props.formData.email} placeholder="你的邮箱"
              onChange={this.props.onChange.bind(null,'email')}
            />
          </div>
          <div className="row action">
            <button type="submit">发送重置邮件</button>
            <p className="btnRe" onClick={this.props.onSignIn}>返回登录</p>
          </div>
        </form>
      </div>
    )
  }
}