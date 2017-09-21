import React from 'react'

function submit(props,e){
  if(e.key === 'Enter'){
    props.onSubmit(e)
  }
}

function changeTitle(props,e){
  props.onChange(e)
}

export default function(props){
  return <input type="text" value={props.content} placeholder="按ENTER键添加todo"
    className="ToduInput"
    onChange={changeTitle.bind(null,props)}
    onKeyPress={submit.bind(null,props)} />
  //这里在执行事件时，是按照submit.call()方法调用函数
  //第一个参数为this，如果直接传参，会将props为this
  //所以需要bind(null,props)
}