import React from 'react'
import Link from 'next/link'
import UserCard from '@components/UserCard'
import { apiGetTest } from '@api/index'

const Home = () => {
    return (
        <div style={{ display: 'flex', gap: '30px', margin: '100px 200px' }}>
            <div
                style={{
                    fontSize: '20px',
                    padding: '20px 30px',
                    background: 'rgba(0, 128, 127, 0.4)',
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
                        <Link href="setting">setting 페이지</Link>
                    </li>
                    <li>
                        <Link href="meeting/1">meeting 페이지</Link>
                    </li>
                    <li>
                        <Link href="progress">timer 링크</Link>
                    </li>
                </div>
            </div>

            <div
                style={{
                    display: 'inline-block',
                    fontSize: '20px',
                    padding: '20px 30px',
                    background: 'rgba(0, 128, 127, 0.4)',
                }}
            >
                <h1>UI  샘플</h1>
                <h1 style={{ color: 'blue', fontSize: '24px' }}>
                    <Link href="/ui">물이 떨어지는 타이머 페이지 링크</Link>
                </h1>
                <h1 style={{ color: 'blue', fontSize: '24px' }}>
                    <Link href="/ui2">물이 차오르는 타이머 페이지 링크</Link>
                </h1>
            </div>
        </div>
    )
}

export default Home
