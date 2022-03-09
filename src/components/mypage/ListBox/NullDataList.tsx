import React from 'react'
import {
    TabContainer,
    BoxContainer,
    DataNullBox,
    InputPStype,
    TimeStyle,
    NullTabContainer,
} from '../styles'
import styled from 'styled-components'
import { useRouter } from 'next/router'

function NullDataList() {
    const router = useRouter()
    return (
        <div>
            {' '}
            <NullTabContainer>
                <DataNullBox>
                    <ImageNull src="/image/img_first.png" />
                    <p className="nullPstyle" style={{ marginTop: '34px' }}>
                        아직 회의록을 작성하지 않으셨나요? <br /> 팀원들과 함께
                        효율적인 회의를 진행해보세요!
                    </p>
                    <button
                        className="dataNullBtn"
                        style={{ marginTop: '36px', cursor: 'pointer' }}
                        onClick={() => {
                            router.push('/setting')
                        }}
                    >
                        회의 시작하기
                    </button>
                </DataNullBox>
            </NullTabContainer>
        </div>
    )
}
const ImageNull = styled.img`
    justify-content: center;
    align-item: center;
    width: 300px;
    height: 300px;
    text-align: center;
    margin: 104px auto 0 auto;
`
export default NullDataList
