import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../helper/connectDB";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise((resolve, reject) => {
        if (req.method === "GET") {
            const connection = connectDB()
            connection.query('select * from pubnote ', (err, data, fileds) => {
                if (err) throw err
                res.status(200).json({ data: data })
                connection.end()
                resolve(200)
            })
        }
        else {
            res.status(405).json({ error: '请求method不正确' })
            reject({ error: '请求方法不正确' })
        }
    })
}