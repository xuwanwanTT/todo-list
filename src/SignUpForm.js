import React from 'react'

export default function(props){
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/*注册*/}
      <div className="row">
        <input type="text" value={props.formData.username} placeholder="昵称（如：user）"
          onChange={props.onChange.bind(null,'username')} />
      </div>
      <div className="row">
        <input type="text" value={props.formData.email} placeholder="你的邮箱"
          onChange={props.onChange.bind(null,'email')} />
      </div>
      <div className="row">
        <input type="password" value={props.formData.password} placeholder="设置密码"
          onChange={props.onChange.bind(null,'password')} />
      </div>
      <div className="row action">
        <button type="submit">注册</button>
      </div>
    </form>    
  )
}