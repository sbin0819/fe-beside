import { useEffect, useState } from 'react'
import { Svg, TextArea } from '@components/common'
import { Notepad, noteViewBox } from '@svgs/Notepad'
import { Pin, pinViewBox } from '@svgs/Pin'

import styled from 'styled-components'

import { nanoid } from '@reduxjs/toolkit'
import useMeeting from '@store/meeting/useMeeting'
import { AgendaState } from '@store/meeting/meetingSlice'
import useMeetingActions from '@store/meeting/useMeetingActions'
import axios from '@axios'
import { baseURL } from '@api/index'

import ActionItems from './ActionItems'

const MenuTopContainer = styled.div`
    height: 24px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`

const MenuContainer = styled.div<{ height?: number }>`
    margin-top: 20px;
    min-height: ${({ height }) => (height ? height : 120)}px;
`

const Header = styled.div`
    display: flex;
    margin-bottom: 14px;
`

const Body = styled.div`
    width: 100%;
    input {
        width: 100%;
    }
`

const ItemList = styled.div`
    margin: 12px 0;
    border-top: solid 1px #f1f1f1;
    border-left: solid 1px #f1f1f1;
    border-right: solid 1px #f1f1f1;
`

const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 103px;
    padding: 16px 16px 17px 20px;
    border-bottom: solid 1px #f1f1f1;
    background-color: #fff;
    input[type='date']::before {
        content: attr(data-placeholder);
        width: 100%;
        color: gray;
    }
    input[type='date']:focus::before {
        display: none;
    }
    input[type='date']:valid::before {
        display: none;
    }
`

const AddButton = styled.div`
    display: flex;
    align-items: center;
    margin-top: 13px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(60, 60, 67, 0.6);
    cursor: pointer;
`

function MeetingForm() {
    const { agendas, agendaCursor } = useMeeting()
    const [activeAgenda, setActiveAgenda] = useState<AgendaState>(null)
    const [areaForm, setAreaForm] = useState({ discussion: '', decisions: '' })

    const { setForm } = useMeetingActions()

    useEffect(() => {
        if (Array.isArray(agendas)) {
            setActiveAgenda(agendas[agendaCursor])
        }
    }, [agendaCursor, activeAgenda])

    useEffect(() => {
        if (activeAgenda) {
            setAreaForm({
                discussion: activeAgenda?.discussion,
                decisions: activeAgenda?.decisions,
            })
        }
    }, [activeAgenda])

    const onPatchAgenda = async () => {
        await axios.patch(`${baseURL}/api/agenda/${activeAgenda?.agenda_id}/`, {
            discussion: areaForm.discussion,
            decisions: areaForm.decisions,
        })
    }

    useEffect(() => {
        const cleanTime = setTimeout(() => {
            onPatchAgenda()
        }, 300)
        return () => {
            clearTimeout(cleanTime)
        }
    }, [areaForm.discussion, areaForm.decisions])

    const onChange = (e) => {
        const { value, name } = e.target
        let rValue = value.replace(/\- /gi, ' · ')
        setAreaForm((prev) => ({ ...prev, [name]: rValue }))
        const newAgenda = {
            ...activeAgenda,
            [name]: rValue,
        }
        setForm({ agendaCursor, newAgenda })
    }

    return (
        <>
            <MenuTopContainer>{activeAgenda?.agenda_title}</MenuTopContainer>
            <MenuContainer height={150}>
                <Header>
                    <div>
                        <Svg viewBox={noteViewBox} width={'20'} height={'18'}>
                            <Notepad />
                        </Svg>
                    </div>
                    <div>논의 내용</div>
                </Header>
                <Body>
                    <TextArea
                        name="discussion"
                        value={areaForm?.discussion || ''}
                        placeholder="논의할 내용에 대해 작성해주세요."
                        onChange={onChange}
                        row={
                            areaForm?.discussion === null
                                ? 1
                                : areaForm?.discussion?.split('\n').length + 1
                        }
                    />
                </Body>
            </MenuContainer>
            <MenuContainer height={140}>
                <Header>
                    <div>
                        <Svg viewBox={pinViewBox} width={'20'} height={'18'}>
                            <Pin />
                        </Svg>
                    </div>
                    <div>결정된 사항</div>
                </Header>
                <Body>
                    <TextArea
                        name="decisions"
                        value={areaForm?.decisions || ''}
                        placeholder="결정된 사항을 작성해주세요"
                        onChange={onChange}
                        row={
                            areaForm?.decisions === null
                                ? 1
                                : areaForm?.decisions?.split('\n').length + 1
                        }
                    />
                </Body>
            </MenuContainer>
            <ActionItems />
        </>
    )
}

export default MeetingForm
