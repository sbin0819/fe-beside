import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { useRouter } from 'next/router'
import MyList from './MyList'
import MyRemove from './MyRemove'

const Container = styled.div`
    position: relative;
`
const BoxContainer = styled.div`
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    // font-algin: left;
    top: 70px;
`
const TabContainer = styled.div`
    border: 1px solid blue;
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    background-color: #fff;
`
const TitleMenu = styled.li`
    line-height: 1.4;
    font-size: 20px;
    font-weight: bold;
    margin-right: 28px;
    padding: 11px 10px;
`
const TabMemu = styled.p`
    color: blue;
    // position: absolute;
    // left: 0;
`
function MyPageList() {
    const [activeIndex, setActiveIndex] = useState(0)
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }
    const tabContArr = [
        {
            tabTitle: (
                <TitleMenu
                    className={activeIndex === 0 ? 'is-active' : 'active-no'}
                    onClick={() => tabClickHandler(0)}
                    style={{ cursor: 'pointer' }}
                >
                    전체 회의록
                </TitleMenu>
            ),
            tabCont: <MyList />,
        },
        {
            tabTitle: (
                <TitleMenu
                    className={activeIndex === 1 ? 'is-active' : 'active-no'}
                    onClick={() => tabClickHandler(1)}
                    style={{ cursor: 'pointer' }}
                >
                    삭제된 회의록
                </TitleMenu>
            ),
            tabCont: <MyRemove />,
        },
    ]
    return (
        <Container>
            <Banner />
            <BoxContainer>
                <p style={{ display: 'flex', marginBottom: '19px' }}>
                    {tabContArr.map((section, index) => {
                        return section.tabTitle
                    })}
                </p>
                <div>{tabContArr[activeIndex].tabCont}</div>
            </BoxContainer>
        </Container>
    )
}

export default MyPageList
