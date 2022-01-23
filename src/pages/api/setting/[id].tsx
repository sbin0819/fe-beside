import { nanoid } from '@reduxjs/toolkit'
import { NextApiRequest, NextApiResponse } from 'next'
import { Forms } from 'types/setting'

const data1 = {
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

const data2 = {
    1: {
        id: nanoid(),
        agenda: '가나다라',
        duration: 20,
        order: 1,
        created_at: new Date(),
        updated_at: null,
    },
    2: {
        id: nanoid(),
        agenda: '마바사아',
        duration: 10,
        order: 2,
        created_at: new Date(),
        updated_at: null,
    },
    3: {
        id: nanoid(),
        agenda: '칠성사이다',
        duration: 10,
        order: 3,
        created_at: new Date(),
        updated_at: null,
    },
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Forms>
) {
    const response = req.query.id === '1' ? data1 : data2
    res.status(200).json(response)
}
