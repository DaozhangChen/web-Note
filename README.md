# 简介
[浏览链接](http://chenweixing:82)  
这是一个基于Next.js与TSX构建的在线便利贴应用，具有以下几个功能：
* 可以非常简便的进行在线添加标签，删除标签，修改标签等操作
* 可以进行用户登录，用户注册，每一个用户可以管理自己的便利贴
* 采用了响应式布局，当屏幕宽度改变，便利贴的排列方式也会随之改变
* 采用了云数据库的功能，让便利贴可以在线保存，不用惧怕数据丢失
# 开发
```bash
//使用npm
npm install

//使用yarn
yarn install

//使用pnpm
pnpm install
```
> 注意：我将自己是数据库的账号密码隐藏了，如果需要链接自己的数据库，建议使用下面的格式
```ts
//我这里使用的数据库为mysql
//建议在helper中创建文件connectDb.ts

import mysql from 'mysql'

export const connectDB = () => {
    const connection = mysql.createPool({
        host: '你的host，一般为localhost',
        user: '你的数据库用户名',
        password: '你的数据库密码',
        database: '链接数据库名',
    })
    return connection
}

//这样就可以了，使用方法在/page/api中的每一个文件中
```
# 部署
```
//npm
npm run build
//部署完成后
npm run start
```