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
import { baseURL } from '@api/index'
import { meetsNSWR } from '@api/meet'
import { userSWR } from '@api/user'

function MyList() {
    // const { userData } = userSWR()
    const { meetNdata } = meetsNSWR()

    return (
        <React.Fragment>
            <ListBoxContainer>
                {meetNdata === undefined ||
                meetNdata.success === false ||
                meetNdata.length === 0 ? (
                    <NullDataList />
                ) : (
                    <YDataList data={meetNdata} />
                )}
            </ListBoxContainer>
        </React.Fragment>
    )
}

export default MyList
