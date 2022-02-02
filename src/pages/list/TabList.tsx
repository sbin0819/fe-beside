import React, { useEffect } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data.data)

const createBoxStyle = {
    border: '2px solid green',
    width: '300px',
    height: '200px',
    margin: '10px 10px',
}
const mettingBoxStyle = {
    backgroundColor: 'ivory',
    width: '300px',
    height: '200px',
    margin: '10px 10px',
    border: '1px solid orange',
}

function tabList() {
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
        'http://localhost:3005/api/bside/meetingList',
        fetcher,
        { revalidateOnFocus: true }
    )
    const removeBtn = async (SEQ) => {
        if (window.confirm('회의록을 삭제하시겠습니까?')) {
            mutate(
                'http://localhost:3005/api/bside/meetingList',
                async (todos) => {
                    const updatedTodo = await axios.post(
                        'http://localhost:3005/api/bside/removeMetting',
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

    return (
        <div>
            <ul style={{ listStyle: 'none' }}>
                <li style={{ float: 'left' }}>
                    <div style={createBoxStyle}>
                        <div
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: 'yellow',
                            }}
                        >
                            추가하기
                        </div>
                    </div>
                </li>
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
                                            삭제하기
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

export default tabList
