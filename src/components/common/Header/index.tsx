import React from 'react'
import styled from 'styled-components'
import { Icon } from '@common'

const Container = styled.div`
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10%;
    border-bottom: 1px solid grey;
`

function Header() {
    return (
        <Container>
            <div>Logo</div>
            <div>홍길동님 효율적인 회의를 위해 정보를 입력해주세요</div>
            <Icon />
        </Container>
    )
}

export default Header
