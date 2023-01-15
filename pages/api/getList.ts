import { NextApiRequest, NextApiResponse } from "next";
import Mock from 'mockjs'
import jwt from 'jsonwebtoken'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const mockData = Mock.mock({
        'data|20': [{
            'id|+1': 1,
            'text|1-100': '321',
            'height|100-500': 100
        }]
    })
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
        jwt.verify(token, 'xxx', function (err, decoded) {
            if (err) throw err
            if (typeof decoded !== 'string' && decoded) {
                console.log(decoded.userId)
            }
        })
    }

    if (req.method === "GET") {
        res.status(200).json(mockData)
    }

}