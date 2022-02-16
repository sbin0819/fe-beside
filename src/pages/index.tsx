import React from 'react'
import Link from 'next/link'
import UserCard from '@components/UserCard'
import { apiGetTest } from '@api/index'

const Home = () => {
    return (
        <>
            <div
                style={{
                    border: '1px solid tomato',
                    display: 'inline-block',
                    fontSize: '20px',
                    padding: '20px 30px',
                }}
            >
                <h1>미팅 셋업 페이지 샘플</h1>
                <div
                    style={{
                        color: 'blue',
                        gap: '5px',
                        marginTop: '10px',
                    }}
                >
                    <li>
                        <Link href="setting">처음 세팅 샘플</Link>
                    </li>
                    <li>
                        <Link href="setting/1">기존 미팅 샘플 1</Link>
                    </li>
                    <li>
                        <Link href="setting/2">기존 미팅 샘플 2</Link>
                    </li>
                </div>
            </div>
            <h1 style={{ color: 'blue', fontSize: '40px' }}>
                <Link href="progress">timer 링크</Link>
            </h1>
            <h1 style={{ color: 'blue', fontSize: '40px' }}>
                <Link href="meeting/1">meeting 페이지 링크</Link>
            </h1>
            <h1 style={{ color: 'blue', fontSize: '40px' }}>
                <Link href="/ui">물이 떨어지는 타이머 페이지 링크</Link>
            </h1>
            <h1 style={{ color: 'blue', fontSize: '40px' }}>
                <Link href="/ui2">물이 차오르는 타이머 페이지 링크</Link>
            </h1>
            {/* <ApiTest /> */}
            <UserCard />
        </>
    )
}

function ApiTest() {
    const { data: dummy, isValidating, error } = apiGetTest()
    if (!dummy) return <div>error... check api</div>
    return (
        <div style={{ margin: '20px 0' }}>
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
