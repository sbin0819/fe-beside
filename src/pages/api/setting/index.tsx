import { nanoid } from '@reduxjs/toolkit'
import type { NextApiRequest, NextApiResponse } from 'next'

const data = {
    1: {
        id: nanoid(),
        agenda: 'agenda 1 입니다.',
        duration: 20,
        order: 1,
        created_at: new Date(),
        updated_at: null,
    },
    2: {
        id: nanoid(),
        agenda: 'agenda 2 입니다.',
        duration: 10,
        order: 2,
        created_at: new Date(),
        updated_at: null,
    },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(data)
}
