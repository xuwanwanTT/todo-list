import React from 'react'

export default function(props){
  return (
    <form className="signIn" onSubmit={props.onSubmit}> {/*登录*/}
      <div className="row">
        <input type="text" value={props.formData.username} placeholder="昵称或邮箱"
          onChange={props.onChange.bind(null,'username')} />
      </div>
      <div className="row">
        <input type="password" value={props.formData.password} placeholder="你的密码"
          onChange={props.onChange.bind(null,'password')} />
      </div>
      <div className="row action">
        <button type="submit">登录</button>
        <p className="btnFgt" onClick={props.onForgotPassword}>忘记密码了？</p>
      </div>
    </form> 
  )
}