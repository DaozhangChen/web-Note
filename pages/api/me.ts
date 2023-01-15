import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import { decode } from "punycode";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        if (req.method === "GET") {
            const token = req.headers.authorization?.split(' ')[1]
            if (token) {
                jwt.verify(token, 'xxx', function (err, decoded) {
                    if (err) throw err
                    if (typeof decoded !== 'string' && decoded) {
                        if (decoded.iat) {
                            if (decoded.iat < Math.floor(Date.now() / 1000)) {
                                const userId = decoded.userId
                                const userName = decoded.userName
                                const connection = mysql.createPool({
                                    host: 'localhost',
                                    user: 'root',
                                    password: 'Bb15880493793.',
                                    database: 'list',
                                    connectionLimit: 10
                                })
                                connection.query('select * from user where userName=? and userId=?', [userName, userId], (err, results, fileds) => {
                                    if (err) throw err
                                    if (results.length === 0) {
                                        res.status(401).json({ error: '身份验证不通过' })
                                        reject({ error: '身份验证不通过' })
                                    } else {
                                        const value = results[0]
                                        res.status(200).json(value)
                                        connection.end()
                                        resolve(value)
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
        }
    })
}