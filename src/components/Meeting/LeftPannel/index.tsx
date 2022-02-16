import { Svg } from '@components/common'
import useMeeting from '@store/meeting/useMeeting'
import { Alarmoff, alarmoffViewBox } from '@svgs/Alarmoff'
import { Next, nextViewBox } from '@svgs/Next'
import { MainPannelContainer, MainPannelTop, MainPannelBody } from './styles'

function LeftPannel() {
    const { agendas } = useMeeting()
    const mockActive = agendas[0]
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
                <div className="main_pannel_top">
                    <div className="main_pannel_body_progress">AGENDA 1</div>
                    <div className="main_pannel_body_sub_title">
                        {mockActive?.agenda_title}
                    </div>
                </div>
                <div className="main_pannel_toast">
                    🔥 결정사항을 정리할 시간이에요!
                </div>
            </MainPannelBody>
        </MainPannelContainer>
    )
}

export default LeftPannel
