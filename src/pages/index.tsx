import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const CardContainer = styled.div`
    margin: 40px auto;
    padding: 20px;
    overflow: scroll;
    width: 1000px;
    border: 3px solid teal;
    h1 {
        font-size: 32px;
    }
    .cards {
        margin-top: 20px;
        gap: 5px;
        display: flex;
    }
`

const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid teal;
    width: 150px;
    height: 80px;
    padding: 8px;
    overflow: hidden;
    cursor: pointer;
    :hover {
        background: lightpink;
        border: none;
    }
`

interface Meet {
    email?: string
    meet_id?: string | number
    meet_title?: string
    meet_date?: string
    meet_status?: string
    rm_status?: string
    participants?: string
    goal?: string
    last_time?: string
}

const Home = ({ meets }: { meets: Meet[] }) => {
    const router = useRouter()
    return (
        <div>
            <div>
                <div
                    style={{
                        display: 'inline-block',
                        fontSize: '20px',
                        padding: '20px 30px',
                        background: 'rgba(0, 128, 127, 0.4)',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-block',
                            color: 'blue',
                            gap: '5px',
                            marginTop: '10px',
                        }}
                    >
                        <li>
                            <Link href="setting">setting 페이지</Link>
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
                        <Link href="/ui2">
                            물이 차오르는 타이머 페이지 링크
                        </Link>
                    </h1>
                </div>
            </div>
            <CardContainer>
                <h1>미팅 페이지 링크</h1>
                <div className="cards">
                    {meets?.map((el, i) => (
                        <Card
                            key={el.meet_id}
                            onClick={() => {
                                router.push({
                                    pathname: '/meeting/[id]',
                                    query: { id: '' + el.meet_id },
                                })
                            }}
                        >
                            {el.meet_title}
                        </Card>
                    ))}
                </div>
            </CardContainer>
        </div>
    )
}

export async function getStaticProps() {
    const resMeet = await fetch(`http://125.6.40.68/api/meet/`)
    const meets = await resMeet.json()
    return { props: { meets } }
}

export default Home
