/*
 * @Description: 单个文件上传-复杂版本
 * @Date: 2020-12-29 20:44:03
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 * 
 * 学习视频：https://www.bilibili.com/video/BV1xa4y1p7uu?p=9
 * 
 * 具体参考文件：/07/index.html，使用 hs 启动
 * 
 *  文件上传--单文件上传版本
 * 
 *  1-解决跨域问题
 *  2-接受文件
 *    -> 2-1 准备一个文件夹放在服务器上，用于存储文件
 *    -> 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 *    -> 2-3 生成一个仓库信息
 *      --> multer.diskStorage({ config 配置信息 }),config 如下：
 *         --> destination: function(req, file, callback) {}
 *         --> filename: function(req, file, callback) {}
 *      --> 返回值：是一个仓库信息
 *    -> 2-4 使用 multer 生成一个接收器
 *       --> 接收配置里面的仓库信息
 *       --> 语法： multer({ storage: 仓库信息})
 * 
 */

 const express = require('express')
 const path = require('path')
 const router = express.Router()
 const cors = require('cors')

 // 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 const multer = require('multer')
 const app = express()

 // 2-3 使用 multer 生成一个仓库信息
 const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
    // req 本次请求信息
    // file 本次请求的文件
    // cb   回调函数，利用回调函数来设定存储路径
    // cb 的第一个参数，设置成 null ，表示不修改 传入的 二进制流 文件
    cb(null, './uploads/')
   },
   filename: (req, file, cb) => {
     // req 本次请求信息
     // file 本次请求的文件
     // cb   回调函数，利用回调函数来设定存储路径
     // cb 的第一个参数，设置成 null ，表示不修改 传入的 二进制流 文件
     // cb 的第二个参数，是重命名 传入的文件 
    //  cb(null, 'new_name.jpg')
    // 获取后缀名
    const suffix = path.extname(file.originalname)
    // 随机数命名
    cb(null, `new_name_${new Date().getTime()}_${Math.random().toString().slice(2)}${suffix}`)
   }
 })

//  2-4 配置接收器，带有仓库信息
 const storage = multer({ storage: fileStorage })

 //  允许跨域
 app.use(cors())

//  2-5 使用我们配置好的接收器 去接收文件
 router.post('/upload', storage.single('file'), (req, res) => {
   console.log('req.file', req.file);
   console.log('received upload');
   res.end(req.file.originalname)
 })

 
 app.use(router)

 app.listen(8888, () => {
   console.log('start at port 8888');
 })