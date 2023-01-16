import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../helper/connectDB'
import jwt from 'jsonwebtoken'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        if (req.method === "PATCH") {
            const token = req.headers.authorization?.split(' ')[1]
            const { noteId, text, height } = JSON.parse(req.body)
            if (token) {
                jwt.verify(token, 'xxx', function (err, decoded) {
                    if (err) throw err
                    if (typeof decoded !== 'string' && decoded) {
                        if (decoded.iat) {
                            if (decoded.iat < Math.floor(Date.now() / 1000)) {
                                const userId = decoded.userId
                                const userName = decoded.userName
                                const connection = connectDB()
                                connection.query('select * from user where userName=? and userId=?', [userName, userId], (err, results, fileds) => {
                                    if (err) throw err
                                    if (results.length === 0) {
                                        connection.end()
                                        res.status(401).json({ error: '身份验证不通过' })
                                        reject({ error: '身份验证不通过' })
                                    } else {
                                        connection.query(`UPDATE note SET text=?, height=? where userId=? and noteId=?`, [text, height, userId, noteId], (err, data, fileds) => {
                                            if (err) throw err
                                            if (data.length === 0) {
                                                res.status(404).json({ error: '更新数据不成功' })
                                                connection.end()
                                                reject(404)
                                            } else {
                                                res.status(200).json({ message: '更新成功' })
                                                connection.end()
                                                resolve(200)
                                            }
                                        })
                                    }
                                })
                            } else {
                                res.status(401).json({ error: '身份验证不通过' })
                                reject({ error: '身份验证不通过' })
                            }
                        } else {
                            res.status(401).json({ error: '身份验证不通过' })
                            reject({ error: '身份验证不通过' })
                        }
                    }
                })
            }
        } else {
            res.status(405).json({ error: '请求method不正确' })
            reject({ error: '请求方法不正确' })
        }
    })
}
