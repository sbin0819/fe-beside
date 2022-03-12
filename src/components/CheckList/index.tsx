import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'
import axios from '@axios'
import { baseURL } from '@api/index'
import { checkSWR } from '@api/checklist'
import RadarChart from '@components/RadarChart'
import CheckNull from './CheckNull'
import CheckData from './checkData'
import {
    Container,
    ModalContainer,
    TopContainer,
    FooterContainer,
} from './style'

const LabelColor = styled.label<{ textColors?: boolean }>`
    color: ${(props) => (props.textColors ? 'red' : 'blue')};
`
interface Props {
    onClose: () => void
}
interface CheckProps {
    meet_id?: string
    check_id?: string
    check1?: string
    check2: string
    check3: string
    check4: string
    check5: string
    check6: string
    check7: string
    check8: string
    check9: string
    check10: string
    success: any
}
function CheckListModal({ onClose }: Props) {
    const ref = useRef<any>()
    let id = 1
    // const { checkData } = checkSWR(id)
    const [checkData, setCheckData] = useState<CheckProps>(null)
    const [checkResult, setCheckResult] = useState(null)
    useEffect(() => {
        // console.log(checkData)
        axios.get(`${baseURL}/api/selfcheck/${id}/`).then((res) => {
            console.log('check-', res.data)
            setCheckData(res.data)
            setCheckResult(res.data.success)
        })
        console.log('checkResult', checkData)
        // console.log('---', checkData.length)
    }, [])

    return (
        <Container>
            <ModalContainer ref={ref}>
                <TopContainer>
                    <div className="top_title">회의 자가진단 CheckList</div>
                    <div className="top_description">
                        <p>회의를 잘 마치셨나요?</p>
                        <p>
                            회의를 진행하는 시간만큼 회의에 대해 평가하고
                            회고하는 시간도 중요합니다. 앞으로 더 효율적인
                            회의를 진행하기 위해 팀원들과 이번 회의를
                            평가해볼까요?
                        </p>
                    </div>
                </TopContainer>
                <CheckData checkData={checkData} />

                {/* {checkData === null || checkData.success === false ? (
                    <CheckNull />
                ) : (
                    <CheckData checkData={checkData} />
                )} */}

                <FooterContainer>
                    <button className="none-btn">나중에 할게요</button>
                    <button className="success-btn">자가진단 완료</button>
                </FooterContainer>
            </ModalContainer>
        </Container>
    )
}

export default CheckListModal
