import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'
import axios from '@axios'
import { baseURL } from '@api/index'
import { checkSWR } from '@api/checklist'
import RadarChart from '@components/RadarChart'
import CheckNull from './CheckNull'
import CheckData from './CheckData'
import { Container, ModalContainer, TopContainer, FooterContainer } from './style'

const LabelColor = styled.label<{ textColors?: boolean }>`
    color: ${(props) => (props.textColors ? 'red' : 'blue')};
`
interface Props {
    onClose: () => void
}
interface BooProps {
    deactivate?: boolean
}
interface CheckProps {
    meet_id?: string
    check_id?: string
    check1?: string
    check2?: string
    check3?: string
    check4?: string
    check5?: string
    check6?: string
    check7?: string
    check8?: string
    check9?: string
    check10?: string
    success?: any
}
function CheckListModal({ onClose }: Props) {
    const ref = useRef<any>()
    let id = 4
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
            {checkData === null || checkData.success === false ? (
                <CheckNull onClose={onClose} />
            ) : (
                <CheckData checkData={checkData} onClose={onClose} />
            )}
        </Container>
    )
}

export default CheckListModal
