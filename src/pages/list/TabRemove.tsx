import React, { useEffect } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data.data)
const mettingBoxStyle = {
    backgroundColor: 'ivory',
    width: '300px',
    height: '200px',
    margin: '10px 10px',
    border: '1px solid orange',
}

function tabRemove() {
    const tabs = [
        {
            state: 1,
            stateResult: '진행 전',
        },
        {
            state: 2,
            stateResult: '진행 중',
        },
        {
            state: 3,
            stateResult: '진행 후',
        },
    ]
    const { data, error } = useSWR(
        'http://localhost:3005/api/bside/meetingRemoveList',
        fetcher,
        { revalidateOnFocus: true }
    )

    const removeBtn = async (SEQ) => {
        if (window.confirm('회의록을 복구하겠습니까?')) {
            mutate(
                'http://localhost:3005/api/bside/meetingRemoveList',
                async (todos) => {
                    const updatedTodo = await axios.post(
                        'http://localhost:3005/api/bside/reloadingMetting',
                        { seq: SEQ }
                    )
                    console.log('result == ', updatedTodo)
                    const filteredTodos = todos.filter(
                        (todo) => todo.SEQ !== '1'
                    )
                    return [...filteredTodos, updatedTodo]
                }
            )
        }
    }

    useEffect(() => {
        console.log('data --- ', data)
    }, [])

    return (
        <div>
            <ul style={{ listStyle: 'none' }}>
                {data &&
                    data.map((datas) => {
                        return (
                            <>
                                <li key={datas.SEQ} style={{ float: 'left' }}>
                                    <div style={mettingBoxStyle}>
                                        {/* <p>{tabs[datas.STATE].stateResult}</p> */}
                                        <p>{datas.SUBJECT}</p>
                                        <p>{datas.M_TIME}</p>
                                        <p onClick={() => removeBtn(datas.SEQ)}>
                                            복구하기
                                        </p>
                                    </div>
                                </li>
                            </>
                        )
                    })}
            </ul>
        </div>
    )
}

export default tabRemove
