import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const username = JSON.parse(req.body).username
        const password = JSON.parse(req.body).password
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Bb15880493793.',
            database: 'list'
        })
        connection.connect()
        connection.query('insert into user value (?,?,?)', [0, username, password], (err, results, fileds) => {
            if (err) throw err
        })
        connection.end()
        res.status(200).json({ name: '注册成功' })
    }
}
