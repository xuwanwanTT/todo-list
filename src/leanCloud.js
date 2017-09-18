import AV from 'leancloud-storage'       

var APP_ID = 'pen2LxGH3TmOc876lQRG6Jum-gzGzoHsz';
var APP_KEY = 'l1541niyTjE9siUDCVw5mTaf';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username, email, password, successFn, errorFn){
  var user = new AV.User()    //新建 AVUser 对象实例
  user.setUsername(username)  //设置用户名
  user.setPassword(password)  //设置密码
  user.setEmail(email)        //设置邮箱
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}