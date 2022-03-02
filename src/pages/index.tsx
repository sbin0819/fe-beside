import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

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

const Home = () => {
    const router = useRouter()
    const { data: meets } = useSWR('http://localhost:8000/api/meet/', (url) =>
        fetch(url, {
            headers: {
                Authorization: cookies.get('Authorization'),
            },
            credentials: 'include',
        }).then((res) => res.json())
    )

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
                            <Link href="result">자가진단 checklist 링크</Link>
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
                    <Card
                        onClick={() =>
                            router.push({
                                pathname: '/setting',
                            })
                        }
                    >
                        미팅 세팅 하기
                    </Card>
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
            <CardContainer>
                <h1>기존 미팅 페이지 수정하기</h1>
                <h2 style={{ marginTop: '12px', color: 'darkblue' }}>
                    (나중에 할래요 클릭시?)
                </h2>
                <div className="cards">
                    <Card
                        onClick={() =>
                            router.push({
                                pathname: '/setting/1/',
                            })
                        }
                    >
                        기존 미팅
                    </Card>
                </div>
            </CardContainer>
        </div>
    )
}

// export async function getStaticProps() {
//     const resMeet = await fetch(`http://localhost:8000/api/meet/`, {
//         headers: {
//             Authorization:
//                 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsImV4cCI6MTY0NjczMzU3NCwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20ifQ.dkVpKFIgU6KW56ppBkzPbD2cxXP7hIASC4-I05u7VaA',
//         },
//     })
//     const meets = await resMeet.json()
//     return { props: { meets } }
// }

export default Home
