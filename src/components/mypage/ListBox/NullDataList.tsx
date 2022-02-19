import React from 'react'
import {
    TabContainer,
    BoxContainer,
    DataNullBox,
    InputPStype,
    TimeStyle,
    NullTabContainer,
} from '../styles'

function NullDataList() {
    return (
        <div>
            {' '}
            <NullTabContainer>
                <DataNullBox>
                    <div
                        style={{
                            width: '300px',
                            height: '300px',
                            backgroundColor: 'yellow',
                        }}
                    >
                        데이터 없는 이미지
                    </div>
                    <p className="nullPstyle">
                        아직 회의록을 작성하지 않으셨나요? <br /> 팀원들과 함께
                        효율적인 회의를 진행해보세요!
                    </p>
                    <button className="dataNullBtn">회의 시작하기</button>
                </DataNullBox>
            </NullTabContainer>
        </div>
    )
}

export default NullDataList
