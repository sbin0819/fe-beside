import React from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { Dropdown, dropdownViewBox } from '@svgs/Dropdown'

const Container = styled.div`
    position: relative;
`

const InnerContainer = styled.div`
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    margin: 0 auto;
    height: 600px;
    /* width: 1000px; */
`

const MainPannelContainer = styled.div`
    width: 460px;
    padding: 30px 0 446px;
    border-radius: 24px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
    background: #0c254c;
    color: white;
`

const RightSection = styled.div`
    margin-left: 24px;
    .summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 656px;
        height: 72px;
        padding: 0 24px;
        flex-grow: 0;
        border-radius: 24px;
        box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
        border: solid 1px #f1f1f1;
        background: #fff;
        .agenda_order {
            font-family: Pretendard;
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.43;
            letter-spacing: normal;
            text-align: left;
            color: #87878b;
            margin-right: 12px;
        }
        .agenda_desc {
            font-family: Pretendard;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #000;
        }
        .summary_progress {
            display: flex;
            align-items: center;
            .agenda_type {
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #f79058;
                margin-right: 26px;
            }
        }
    }
`

function Meeting() {
    return (
        <Container>
            <Banner />
            <InnerContainer>
                <MainPannelContainer></MainPannelContainer>
                <RightSection>
                    <div className="summary">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="agenda_order">AGENDA1</div>
                            <div className="agenda_desc">
                                회의 진행 화면 UI 디자인 시안 발표 및 개발 구현
                                관련 논의
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
            </InnerContainer>
        </Container>
    )
}

export default Meeting
