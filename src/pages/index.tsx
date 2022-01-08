import React from 'react'
import UserCard from '@components/UserCard'
import { apiGetTest } from '@api/index'
const Home = () => {
    return (
        <>
            <ApiTest />
            <UserCard />
        </>
    )
}

function ApiTest() {
    const { data: dummy, isValidating, error } = apiGetTest()
    if (!dummy) return <div>error... check api</div>
    return (
        <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>API 테스트</h1>
            <div style={{ display: 'flex', gap: 10 }}>
                {dummy.data.map((el) => (
                    <div key={el.id}>{el.content}</div>
                ))}
            </div>
        </div>
    )
}

export default Home
