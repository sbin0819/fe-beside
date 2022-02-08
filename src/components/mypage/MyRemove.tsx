import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { useRouter } from 'next/router'

const TabContainer = styled.div`
    border: 1px solid blue;
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    background-color: #fff;
`

function MyRemove() {
    return <TabContainer>삭제 리스트</TabContainer>
}

export default MyRemove
