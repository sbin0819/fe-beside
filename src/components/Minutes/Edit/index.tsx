import React from 'react'
import { Banner, Svg } from '@components/common'
import styled from 'styled-components'
import Header from './EditHeader'
import Body from './EditBody'
import { baseURL } from '@api/index'
import { meetSWR } from '@api/meet'

const Container = styled.div`
    position: relative;
`

function EditPage() {
    let id = 4

    const { meetData } = meetSWR(id)

    React.useEffect(() => {
        console.log('meet --', meetData)
    }, [])
    return (
        <Container>
            <div>
                <Banner />
                <Header />
                <Body />
            </div>
        </Container>
    )
}

export default EditPage
