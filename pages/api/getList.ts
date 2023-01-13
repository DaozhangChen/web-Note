import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        res.status(200).json({
            data: [
                { id: 1, text: '31231321', height: 100 },
                { id: 2, text: '64', height: 150 },
                { id: 3, text: '64654654', height: 200 },
                { id: 4, text: '13213', height: 300 },
                { id: 5, text: '654654', height: 150 },
                { id: 6, text: '654654', height: 112 },
                { id: 7, text: '1321321', height: 130 },
                { id: 8, text: '645654', height: 140 },
                { id: 9, text: '65465487', height: 200 },
                { id: 10, text: '4654654', height: 180 },
                { id: 11, text: '3232465464', height: 130 }
            ]
        })
    }

}