import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    TabContainer,
    BoxContainer,
    DataNullBox,
    InputPStype,
    ListBoxContainer,
    TimeStyle,
} from './styles'
import { Banner, Svg } from '@components/common'
import { useRouter } from 'next/router'
import useSWR from 'swr'
// import axios from 'axios'
import axios from '@axios'
import moment from 'moment'
import NullDataList from './ListBox/NullDataList'
import YDataList from './ListBox/YDataList'

const fetcher = (url) => axios.get(url).then((res) => res.data)
function MyList() {
    const [testData, setTestData] = useState(undefined)
    const { data, error } = useSWR(
        'http://127.0.0.1:8000/api/meet/?meet_status=Y',
        fetcher,
        { revalidateOnFocus: true }
    )

    // const data = [
    //     {
    //         user_id: 1,
    //         meet_title: '제목입니다.',
    //         meet_date: '2022-02-28T16:11:31.147Z',
    //         meet_status: 'Y',
    //         rm_status: 'W',
    //         participants: 'user',
    //         goal: 'goal',
    //     },
    //     {
    //         user_id: 1,
    //         meet_title: '제목입니다.2',
    //         meet_date: '2022-02-28T16:11:31.147Z',
    //         meet_status: 'P',
    //         rm_status: 'W',
    //         participants: 'user',
    //         goal: 'goal',
    //     },
    //     {
    //         user_id: 1,
    //         meet_title: '제목입니다.3',
    //         meet_date: '2022-02-28T16:11:31.147Z',
    //         meet_status: 'C',
    //         rm_status: 'N',
    //         participants: 'user',
    //         goal: 'goal',
    //     },
    // ]

    React.useEffect(() => {
        console.log('겟 미트 api1', data)
        // console.log('겟 미트 api2', data['success'])
        // console.log('겟 미트 api3', data.success)
    }, [])
    // || data.success === false
    return (
        <React.Fragment>
            <ListBoxContainer>
                {data === undefined ? (
                    <NullDataList />
                ) : (
                    <YDataList data={data} />
                )}
            </ListBoxContainer>
        </React.Fragment>
    )
}

export default MyList
