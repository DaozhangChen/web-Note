import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql'



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
                res.status(200).json(results)
                resolve(results)
                connection.end()
            })
        } else {
            res.status(400).json({ message: 'error' })
            reject('method error')
        }
    })
}