import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    display: flex;
    height: 220px;
    align-items: center;
    justify-content: space-between;
    margin-top: 1px;
    padding: 0 15%;
    background: linear-gradient(
        90deg,
        rgba(223, 237, 246, 1) 0%,
        rgba(231, 238, 241, 1) 47%,
        rgba(244, 241, 231, 1) 90%
    );
`

function Banner() {
    return <Container />
}

export default Banner
