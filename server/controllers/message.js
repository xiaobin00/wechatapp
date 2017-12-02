const { message: { checkSignature } } = require('../qcloud')
const { mysql } = require('../qcloud')
/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get (ctx, next) {
    const { signature, timestamp, nonce, echostr } = ctx.query
    if (checkSignature(signature, timestamp, nonce)) ctx.body = echostr
    else ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'
}

async function post (ctx, next) {
    // 检查签名，确认是微信发出的请求
    const { signature, timestamp, nonce } = ctx.query
    if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

    /**
     * 解析微信发送过来的请求体
     * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
     */
    const body = ctx.request.body

    ctx.body = 'success'
}

async function insert(ctx,next){
  var name = ctx.query.name;
  var mobile = ctx.query.mobile; 
  mysql('test').insert({ name: name, phone: mobile, status: 1, activity_id: 1}).returning('*')   .then(res => {
      console.log(res)
    })
  ctx.body = mysql('test').select('name').where({ id: 1 }).then(function (productRow) {
    return productRow;
  })
}

module.exports = {
    post,
    insert,
    get
}
