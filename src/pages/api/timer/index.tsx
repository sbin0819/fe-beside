import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
    start: boolean
    duration: number
    remainingTime: number
    level: number
}
const data = {
    start: false,
    duration: 60 * 2,
    remainingTime: 60 * 2,
    level: 1,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'PUT') {
        console.log(req.body)
        // Process a POST request
    } else {
        res.status(200).json(data)
    }
}
