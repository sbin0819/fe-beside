import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15%;
    background: linear-gradient(
        90deg,
        rgba(223, 237, 246, 1) 0%,
        rgba(231, 238, 241, 1) 47%,
        rgba(244, 241, 231, 1) 90%
    );
    .header_logo {
        font-weight: 900;
    }
    .header_desc {
        .username {
            font-weight: 900;
        }
        .description {
            padding-right: 12px;
        }
    }
`
interface HeaderProps {
    desc?: string
}
function Header({ desc }: HeaderProps) {
    const mockData = {
        username: '오구민',
        icon: '😊',
    }
    return (
        <Container>
            <div className="header_logo">
                <Link href="/">59mins</Link>
            </div>
            <div className="header_desc">
                <span className="username">{mockData.username}</span>
                <span className="description">{desc}</span>
                <span
                    style={{
                        padding: '6px',
                        background: '#fff',
                        borderRadius: '50%',
                    }}
                >
                    {mockData.icon}
                </span>
            </div>
        </Container>
    )
}

export default Header
