import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

const TabContainer = styled.div`
    border: 1px solid blue;
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    background-color: #fff;
`
const BoxContainer = styled.div`
    border: 1px solid red;
    width: 30%;
    height: 30%;
    margin: 10px;
`
const pMargin = {
    margin: '5px',
    border: '1px solid green',
}

const fetcher = (url) => axios.get(url).then((res) => res.data)
function MyList() {
    // const { data: meetDatas, error } = useSWR(
    //     'http://127.0.0.1:8000/api/meet/',
    //     fetcher,
    //     { revalidateOnFocus: true }
    // )

    React.useEffect(() => {
        // console.log('겟 미트 api', meetDatas)
    }, [])
    return (
        <TabContainer>
            {/* {meetDatas &&
                meetDatas.map((meetData) => {
                    ;<BoxContainer key={meetData.meet_id}>
                        <p style={pMargin}>{meetData.status}</p>
                        <p style={pMargin}>{meetData.meet_title}</p>
                        <p style={pMargin}>{meetData.meet_date}</p>
                    </BoxContainer>
                })} */}
        </TabContainer>
    )
}

export default MyList
