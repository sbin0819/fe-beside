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

function LeftPannel() {
    const { agendas } = useMeeting()
    const [twentyPercentLeft, setTwentyPercentLeft] = useState(false)
    const [activeIdx, setActiveIdx] = useState(0)

    const [activeAgenda, setActiveAgenda] = useState<AgendaState>({})
    const mockActive = agendas.filter((el) => el.agenda_status === 'y')[0]
    const onEndAgenda = async () => {
        await axios.patch(
            `http://localhost:8000/api/agenda/${mockActive?.agenda_id}/`,
            {
                agenda_status: 'c',
            }
        )
        setActiveIdx((prev) => prev + 1)
    }

    useEffect(() => {
        if (Array.isArray(agendas)) {
            const idx = agendas.findIndex((el) => el.agenda_status == 'y')
            setActiveIdx(idx)
        }
    }, [agendas])

    useEffect(() => {
        if (Array.isArray(agendas)) {
            setActiveAgenda(agendas[activeIdx])
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
