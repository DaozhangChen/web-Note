import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
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

}