import React, { useState } from 'react'
import axios from 'axios'
import TabList from './TabList'
import TabRemove from './TabRemove'

const fetcher = (url) => axios.get(url).then((res) => res.data.data)
const divStyle = {
    width: '1000px',
    border: '1px solid red',
    height: '700px',
    margin: '0 auto',
}

function index() {
    const [activeIndex, setActiveIndex] = useState(0)
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }
    const tabContArr = [
        {
            tabTitle: (
                <li
                    className={activeIndex === 0 ? 'is-active' : ''}
                    onClick={() => tabClickHandler(0)}
                    style={{ cursor: 'pointer' }}
                >
                    회의 리스트
                </li>
            ),
            tabCont: <TabList />,
        },
        {
            tabTitle: (
                <li
                    className={activeIndex === 1 ? 'is-active' : ''}
                    onClick={() => tabClickHandler(1)}
                    style={{ cursor: 'pointer' }}
                >
                    삭제 리스트
                </li>
            ),
            tabCont: <TabRemove />,
        },
    ]

    return (
        <>
            <div style={divStyle}>
                <ul>
                    {tabContArr.map((section, index) => {
                        return section.tabTitle
                    })}
                </ul>
                <div>{tabContArr[activeIndex].tabCont}</div>
            </div>
        </>
    )
}

export default index
