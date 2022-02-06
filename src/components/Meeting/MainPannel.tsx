import React from 'react'
import { Svg } from '@components/common'
import { Alarmoff, alarmoffViewBox } from '@svgs/Alarmoff'
import { Next, nextViewBox } from '@svgs/Next'
import {
    MainPannelContainer,
    MainPannelTop,
    MainPannelBody,
} from './MainPannel.style'

function MainPannel() {
    return (
        <MainPannelContainer>
            <MainPannelTop>
                <div>
                    <Svg viewBox={alarmoffViewBox} width={'20'} height={'20'}>
                        <Alarmoff />
                    </Svg>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span className="main_pannel_top_desc">NEXT AGENDA</span>
                    <span>
                        <Svg viewBox={nextViewBox} width={'20'} height={'20'}>
                            <Next />
                        </Svg>
                    </span>
                </div>
            </MainPannelTop>
            <MainPannelBody>
                <div className="main_pannel_body_progress">AGENDA 2</div>
                <div className="main_pannel_body_sub_title">
                    회의 진행 화면 UI 디자인 시안 발표 및 개발 구현 관련 논의를
                    해봅시다
                </div>
            </MainPannelBody>
        </MainPannelContainer>
    )
}

export default MainPannel
