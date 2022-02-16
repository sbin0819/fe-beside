import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import styled from 'styled-components'
import useMeeting from '@store/meeting/useMeeting'
import useMeetingActions from '@store/meeting/useMeetingActions'

const MenulSteps = styled.div`
    display: flex;
    margin: 28px 0 32px;
    gap: 10px;
    .menu_step {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 76px;
        height: 28px;
        border-radius: 8px;
        border: solid 1px #d6d6d7;
        background-color: #fff;
        font-size: 12px;
        color: #0c254c;
        cursor: pointer;
    }
    .menu_step.active {
        background: #384c6c;
        color: #fff;
    }
`

function MeetingStep() {
    const { agendas, agendaCursor } = useMeeting()
    const { setAgendaCursor } = useMeetingActions()
    return (
        <MenulSteps>
            {agendas.map((data, idx) => (
                <div
                    className={`menu_step ${
                        agendaCursor === idx ? 'active' : ''
                    }`}
                    key={data.agenda_id}
                    onClick={() => setAgendaCursor({ agendaCursor: idx })}
                >
                    AGENDA {idx + 1}
                </div>
            ))}
        </MenulSteps>
    )
}

export default MeetingStep
