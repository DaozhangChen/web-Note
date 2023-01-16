import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { connectDB } from "../../helper/connectDB";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        if (req.method === "POST") {
            const token = req.headers.authorization?.split(' ')[1]
            const body = JSON.parse(req.body)
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
                                        connection.query('insert into note value (?,?,?,?)', [0, userId, body.text, body.height], (err, data, fileds) => {
                                            if (err) throw err
                                            res.status(200).json({ data: data, message: '添加成功' })
                                            connection.end()
                                            resolve('添加成功')
                                        })
                                    }
                                })
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