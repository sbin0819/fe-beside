import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import axios from '@axios'
import useSWR from 'swr'
// import { userSWR, userDataSWR } from '@api/user'
// import { userInfo } from '@api/user'
import { baseURL } from '@api/index'
// import { userSWR } from '../../../pages/userapi'
import { userSWR } from '@api/user'
import { Svg } from '@components/common'
import { LogoDark, logoDarkViewBox } from '@svgs/LogoDark'
import DropdownMenu from './DropdownMenu'
import { useRouter } from 'next/router'
const Container = styled.div`
    background: linear-gradient(
        90deg,
        rgba(223, 237, 246, 1) 0%,
        rgba(231, 238, 241, 1) 47%,
        rgba(244, 241, 231, 1) 90%
    );
    .header_inner {
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        height: 72px;
        .header_logo {
            font-weight: 900;
            color: #0c254c;
            cursor: pointer;
        }
        .header_desc {
            display: flex;
            align-items: center;
            .username {
                font-weight: 700;
            }
            .description {
                padding-right: 12px;
            }
        }
    }
`

interface HeaderProps {
    desc?: string
}
function Header({ desc }: HeaderProps) {
    const { userData } = userSWR()
    const router = useRouter()
    // const { userInfo } = userDataSWR()
    const [userName, setUserName] = useState()
    const [isOpenModal, setIsOpenModal] = useState(false)
    // const [username, setUserName] = useState(userData.nickname)
    const onCloseModal = () => setIsOpenModal(false)
    const mockData = {
        username: '오구민',
        icon: '😊',
    }
    React.useEffect(() => {
        console.log('userData --- ', userData?.emoji)
        console.log('userData --- ', userData)
    }, [])
    // const userName = userData.nickname
    // const { data } = useSWR(`${baseURL}/api/user/`, (url) =>
    //     axios.get(url).then((res) => {
    //         console.log('66', res.data)
    //         res.data
    //         setUserName(res.data.nickname)
    //     })
    // )
    return (
        <Container>
            <div className="header_inner" style={{ width: '1140px' }}>
                <div className="header_logo">
                    <Link href="/">
                        <Svg viewBox={logoDarkViewBox} width={'56'} height={'24'}>
                            <LogoDark />
                        </Svg>
                    </Link>
                </div>
                <div className="header_desc">
                    <div className="username">{userData?.nickname}</div>
                    <div className="description">{desc}</div>
                    <div style={{ position: 'relative' }}>
                        <div
                            style={{
                                padding: '6px',
                                background: '#fff',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                            onClick={() => setIsOpenModal((prev) => !prev)}
                        >
                            <img src="/image/assets/emoji/Smile.png" style={{ width: '26px', height: '26px' }} />
                            {/* {mockData.icon} */}
                        </div>
                        {isOpenModal && <DropdownMenu onClose={onCloseModal} />}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Header
