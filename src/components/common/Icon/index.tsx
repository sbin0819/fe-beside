import React from 'react'
import styled from 'styled-components'

const Container = styled.div<{ size?: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: #eee;
`

interface Props {
    size?: number
}
function Icon({ size = 50 }: Props) {
    return <Container size={size} />
}

export default Icon
