import { nanoid } from '@reduxjs/toolkit'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { StyledInput } from './style'
import { AgendaState } from '@store/meeting/meetingSlice'

const AgendaContainer = styled.div`
    /* margin-top: 32px; */
    gap: 24px;
    .agenda_inputs {
        display: flex;
        /* justify-content: space-between; */
        .agenda_input {
            width: 832px;
            margin-right: 24px;
        }
        .time_input {
            width: 168px;
        }
    }
`

const AgendaAddContainer = styled.div`
    display: inline-block;
    margin: 16px 0 32px;
    padding-left: 20px;
    height: 20px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: rgba(60, 60, 67, 0.6);
    cursor: pointer;
`

type PickedAgenda = Pick<
    AgendaState,
    'agenda_id' | 'agenda_title' | 'setting_time' | 'order_number'
>

interface AgendaWithValidation extends PickedAgenda {
    validation: {
        agenda_title?: { error?: boolean; message?: string }
        setting_time?: { error?: boolean; message?: string }
    }
}

export interface AgendaForms {
    [key: string]: AgendaWithValidation
}

const defaultAgendaForm = {
    // agenda_id: nanoid(),
    // order_number: 1,
    agenda_title: '',
    setting_time: 0,
    validation: {
        agenda_title: {
            error: false,
            message: '',
        },
        setting_time: {
            error: false,
            message: '',
        },
    },
}

function AgendaInputs({
    agendaForms,
    setAgendagendaForms,
}: {
    agendaForms: AgendaForms
    setAgendagendaForms: any
}) {
    const formOrderRef = useRef(1)

    const onChange = (e, order_number) => {
        const { name, value, type } = e.target
        setAgendagendaForms((prev) => ({
            ...prev,
            [order_number]: {
                ...prev[order_number],
                [name]: type === 'text' ? value : value === '' ? '' : +value,
            },
        }))
    }
    const onDelete = (order_number) => () => {
        const newForm = Object.entries(agendaForms).reduce((acc, curr) => {
            const [key, obj] = curr
            if (obj.order_number == order_number) {
                return acc
            }
            if (+key > +order_number) {
                const newOrder = +key - 1
                obj.order_number = newOrder
                acc[newOrder] = obj
                return acc
            }
            acc[key] = obj
            return acc
        }, {})
        // formOrderRef 초기화
        formOrderRef.current = Object.keys(agendaForms).length - 1
        setAgendagendaForms(newForm)
    }

    const addAgendaInput = () => {
        formOrderRef.current = Object.keys(agendaForms).length + 1
        setAgendagendaForms((prev) => ({
            ...prev,
            [formOrderRef.current]: {
                ...defaultAgendaForm,
                agenda_id: nanoid(),
                order_number: formOrderRef.current,
            },
        }))
    }
    return (
        <>
            {Object.entries(agendaForms)
                .sort((a, b) => +a[0] - +b[0])
                .map(([k, form]) => (
                    <React.Fragment key={form.agenda_id}>
                        <AgendaContainer>
                            <div className="agenda_inputs">
                                <StyledInput
                                    type="text"
                                    className="agenda_input"
                                    name="agenda_title"
                                    placeholder="AGENDA"
                                    value={form.agenda_title}
                                    onChange={(e) =>
                                        onChange(e, form.order_number)
                                    }
                                    isInValid={
                                        form?.validation?.agenda_title.error
                                    }
                                />
                                <StyledInput
                                    className="time_input"
                                    type="text"
                                    name="setting_time"
                                    placeholder="목표시간"
                                    value={
                                        parseInt(
                                            form.setting_time
                                                .toString()
                                                .replace(/(^0+)/, '')
                                        ) || ''
                                    }
                                    onChange={(e) =>
                                        onChange(
                                            e,
                                            form.order_number
                                                .toString()
                                                .replace(/(^0+)/, '')
                                        )
                                    }
                                    isInValid={
                                        form?.validation?.setting_time?.error
                                    }
                                />
                            </div>
                        </AgendaContainer>
                        <AgendaAddContainer onClick={addAgendaInput}>
                            + 액션 아이템 추가
                        </AgendaAddContainer>
                    </React.Fragment>
                ))}
        </>
    )
}

export default AgendaInputs
