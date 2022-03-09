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
import { meetsYSWR } from '@api/meet'

function MyList() {
    const { meetYdata } = meetsYSWR()

    return (
        <React.Fragment>
            <ListBoxContainer>
                {meetYdata === undefined ||
                meetYdata.success === false ||
                meetYdata.length === 0 ? (
                    <NullDataList />
                ) : (
                    <YDataList data={meetYdata} />
                )}
            </ListBoxContainer>
        </React.Fragment>
    )
}

export default MyList
