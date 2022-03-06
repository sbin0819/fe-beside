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
        'http://127.0.0.1:8000/api/meet/?user_id=1&rm_status=Y',
        fetcher,
        { revalidateOnFocus: true }
    )

    React.useEffect(() => {
        console.log('겟 미트 api1', data)
    }, [])

    return (
        <React.Fragment>
            <ListBoxContainer>
                {data === undefined || data.length === 0 ? (
                    <NullDataList />
                ) : (
                    <YDataList data={data} />
                )}
            </ListBoxContainer>
        </React.Fragment>
    )
}

export default MyList
