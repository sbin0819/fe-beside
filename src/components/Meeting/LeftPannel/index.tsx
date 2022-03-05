import { Svg } from '@components/common'
import useMeeting from '@store/meeting/useMeeting'
import { Alarmoff, alarmoffViewBox } from '@svgs/Alarmoff'
import { Next, nextViewBox } from '@svgs/Next'
import { MainPannelContainer, MainPannelTop, MainPannelBody } from './styles'

import Timer from '@components/Timer'
import { useState } from 'react'

import axios from '@axios'
import { useEffect } from 'react'
import { AgendaState } from '@store/meeting/meetingSlice'
import useMeetingActions from '@store/meeting/useMeetingActions'
import { agendasAPI } from '@api/agenda'
import { useRouter } from 'next/router'

function LeftPannel() {
    const router = useRouter()
    const { agendas } = useMeeting()
    const { setAgendaCursor } = useMeetingActions()
    const [twentyPercentLeft, setTwentyPercentLeft] = useState(false)
    const [activeIdx, setActiveIdx] = useState(0)
    const { agendaMutate } = agendasAPI(router.query.id)
    const [activeAgenda, setActiveAgenda] = useState<AgendaState>({})
    const onEndAgenda = async () => {
        if (activeIdx !== -1) {
            await axios.patch(
                `http://localhost:8000/api/agenda/${activeAgenda?.agenda_id}/`,
                {
                    agenda_status: 'c',
                }
            )
            const idx = agendas.findIndex((el) => el.agenda_status == 'y')
            const nextAgenda = agendas[idx]
            await axios.patch(
                `http://localhost:8000/api/agenda/${nextAgenda?.agenda_id}/`,
                {
                    agenda_status: 'p',
                }
            )
            setActiveIdx((prev) => prev + 1)
            agendaMutate()
        }
    }

    useEffect(() => {
        if (Array.isArray(agendas)) {
            const idx = agendas.findIndex((el) => el.agenda_status == 'p')
            setActiveIdx(idx)
        }
    }, [agendas])

    useEffect(() => {
        if (Array.isArray(agendas)) {
            setActiveAgenda(agendas[activeIdx])
            setAgendaCursor({ agendaCursor: activeIdx })
        }
    }, [agendas, activeIdx])

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
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        onEndAgenda()
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
                <div className="main_pannel_top">
                    <div className="main_pannel_body_progress">
                        AGENDA {activeIdx + 1}
                    </div>
                    <div className="main_pannel_body_sub_title">
                        {activeAgenda?.agenda_title}
                    </div>
                </div>
                <div>
                    {activeAgenda?.agenda_status == 'c' ? (
                        <div>done</div>
                    ) : activeAgenda?.setting_time &&
                      activeAgenda?.agenda_status != 'c' ? (
                        <Timer
                            duration={activeAgenda?.setting_time}
                            progress={activeAgenda?.progress_time}
                            setTwentyPercentLeft={setTwentyPercentLeft}
                        />
                    ) : (
                        <div>loading</div>
                    )}
                </div>
                {twentyPercentLeft && (
                    <div className="main_pannel_toast">
                        🔥 결정사항을 정리할 시간이에요!
                    </div>
                )}
            </MainPannelBody>
        </MainPannelContainer>
    )
}

export default LeftPannel
