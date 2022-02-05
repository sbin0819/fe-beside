import React from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { Alarmoff, alarmoffViewBox } from '@svgs/Alarmoff'
import { Next, nextViewBox } from '@svgs/Next'
import { Dropdown, dropdownViewBox } from '@svgs/Dropdown'
import { RightSection } from './styles'

const Container = styled.div`
    position: relative;
`

const InnerContainer = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
`
const TopContainer = styled.div`
    height: 42px;
    margin-bottom: 24px;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`
const BodyContainer = styled.div`
    display: flex;
    margin: 0 auto;
    height: 600px;
`
const MainPannelContainer = styled.div`
    width: 460px;
    border-radius: 24px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
    background: #0c254c;
    color: white;
    .main_pannel_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 94px;
        border-bottom: 1px solid #fff;
        padding: 0 32px;
    }
    .main_pannel_top_desc {
        font-family: Pretendard;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.4;
        letter-spacing: normal;
        color: #fff;
    }
    .main_pannel_top_desc {
        padding-right: 4px;
    }
`

function Meeting() {
    return (
        <Container>
            <Banner />
            <InnerContainer>
                <TopContainer>회의 제목</TopContainer>
                <BodyContainer>
                    <MainPannelContainer>
                        <div className="main_pannel_top">
                            <div>
                                <Svg
                                    viewBox={alarmoffViewBox}
                                    width={'20'}
                                    height={'20'}
                                >
                                    <Alarmoff />
                                </Svg>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <span className="main_pannel_top_desc">
                                    NEXT AGENDA
                                </span>
                                <span>
                                    <Svg
                                        viewBox={nextViewBox}
                                        width={'20'}
                                        height={'20'}
                                    >
                                        <Next />
                                    </Svg>
                                </span>
                            </div>
                        </div>
                        <div className="main_paneel_body"></div>
                    </MainPannelContainer>
                    <RightSection>
                        <div className="summary">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="agenda_order">AGENDA1</div>
                                <div className="agenda_desc">
                                    회의 진행 화면 UI 디자인 시안 발표 및 개발
                                    구현 관련 논의
                                </div>
                            </div>
                            <div className="summary_progress">
                                <div className="agenda_type">진행중</div>
                                <div>
                                    <Svg
                                        viewBox={dropdownViewBox}
                                        width={'20'}
                                        height={'18'}
                                    >
                                        <Dropdown />
                                    </Svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <li>abcd</li>
                            <li>abcd</li>
                            <li>abcd</li>
                            <li>abcd</li>
                            <li>abcd</li>
                        </div>
                    </RightSection>
                </BodyContainer>
            </InnerContainer>
        </Container>
    )
}

export default Meeting
