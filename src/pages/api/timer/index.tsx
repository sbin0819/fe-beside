import { nanoid } from '@reduxjs/toolkit'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Timer {
    id: string
    start: boolean
    duration: number
    remainingTime: number
    level: number
}
const data = {
    id: nanoid(),
    start: false,
    duration: 60 * 2,
    remainingTime: 60 * 2,
    level: 1,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Timer>
) {
    if (req.method === 'PUT') {
        const newData = {
            ...data,
            remainingTime: JSON.parse(req.body.remainingTime),
        }
        res.status(200).json(newData)
    } else {
        res.status(200).json(data)
    }
}
