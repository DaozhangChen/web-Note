import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql'
import jwt from 'jsonwebtoken'

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
                        console.log(decoded.exp)
                    }
                })
            }
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Bb15880493793.',
                database: 'list'
            })
            connection.connect();
            connection.query('SELECT * from user', function (error, results, fields) {
                if (error) throw error;
                // console.log('The solution is: ', results);
            });
            connection.end();
            res.status(200).json({
                data: []
            })
        }
    })
}