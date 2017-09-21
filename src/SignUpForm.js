import React from 'react'

export default function(props){
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/*注册*/}
      <div className="row">
        <label>用户名</label>
        <input type="text" value={props.formData.username} placeholder="your name"
          onChange={props.onChange.bind(null,'username')} />
      </div>
      <div className="row">
        <label>邮箱</label>
        <input type="email" value={props.formData.email} placeholder="Re. name@email.com"
          onChange={props.onChange.bind(null,'email')} />
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={props.formData.password} placeholder="password"
          onChange={props.onChange.bind(null,'password')} />
      </div>
      <div className="row action">
        <button type="submit">注册</button>
      </div>
    </form>    
  )
}