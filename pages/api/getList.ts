import { NextApiRequest, NextApiResponse } from "next";
import Mock from 'mockjs'

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
    if (req.method === "GET") {
        res.status(200).json(mockData)
    }

}