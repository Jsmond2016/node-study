const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 定位模板文件目录，并选择模板引擎
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  //渲染index.ejs，并传入title变量
  await ctx.render('index', {
    title
  })
})

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
})