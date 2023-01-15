import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../helper/connectDB'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            const username = JSON.parse(req.body).username
            const password = JSON.parse(req.body).password
            const connection = connectDB()
            connection.query('select * from user where userName=?', [username], (err, results, fileds) => {
                if (err) throw err
                if (results.length === 0) {
                    connection.query('insert into user value (?,?,?)', [0, username, password], (err, data, fileds) => {
                        if (err) throw err
                        res.status(200).json({ message: '注册成功' })
                        connection.end()
                        resolve('注册成功')
                    })
                } else {
                    res.status(409).json({ error: '用户名重复' })
                    connection.end()
                    reject('用户名重复')
                }
            })
        }
    })
}
