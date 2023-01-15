import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            const username = JSON.parse(req.body).username
            const password = JSON.parse(req.body).password
            const connection = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'Bb15880493793.',
                database: 'list',
                connectionLimit: 10
            })
            connection.query('select * from user where userName=? and userPassword=?', [username, password], (err, results, fileds) => {
                if (err) throw err
                if (results.length === 0) {
                    res.status(401).json({ error: '用户名或密码错误' })
                    connection.end()
                } else {
                    const value = results[0]
                    const token = jwt.sign(
                        {
                            userId: value.userId,
                            userName: value.userName,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                        }, 'xxx')
                    res.status(200).json(token)
                    connection.end()
                    resolve(token)
                }
            })
        } else {
            res.status(400).json({ error: '请求方法错误' })
            reject('method error')
        }
    })
}