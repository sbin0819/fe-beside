import useTimer from '@hooks/useTimer'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import Bell from '@components/Bell'
import axios from '@axios'
const Container = styled.div`
    display: flex;
    justify-content: center;
    /* background: #020438; */
    font: 14px/1 'Open Sans', helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    .box {
        position: relative;
        height: 250px;
        width: 250px;
        position: relative;
        background: #020438;
        border-radius: 100%;
        overflow: hidden;
        .percent {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 64px;
        }
        .water {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            transform: translate(0, 100%);
            background: #5cbcad;
            transition: all 0.3s;
            &_wave {
                width: 200%;
                position: absolute;
                bottom: 100%;
                &_back {
                    right: 0;
                    fill: #bee4de;
                    animation: wave-back 1.4s infinite linear;
                }
                &_front {
                    left: 0;
                    fill: #5cbcad;
                    margin-bottom: -1px;
                    animation: wave-front 0.7s infinite linear;
                }
            }
        }
    }
    @keyframes wave-front {
        100% {
            transform: translate(-50%, 0);
        }
    }

    @keyframes wave-back {
        100% {
            transform: translate(50%, 0);
        }
    }
`

function AnimationTimer({
    agendaId,
    duration,
    progress,
    alarmSoundControl,
    setTwentyPercentLeft,
    handleProgressTime,
}: {
    agendaId: number | string
    duration: number
    progress?: number
    alarmSoundControl?: boolean
    setTwentyPercentLeft: any
    handleProgressTime: (time: number) => void
}) {
    const initRef = useRef(-1)
    const [isSound, setIsSound] = useState(false)
    const [play, { stop: soundStop }] = useSound('/sounds/alaram.mp3', {
        volume: 0.2,
    })
    const {
        minutes,
        seconds,
        overTime,
        overMinutes,
        overSeconds,
        // start,
        // stop,
        // reset,
        isRunning,
        remainingTime,
    } = useTimer({
        autostart: true,
        duration: duration - 1,
        progress: progress ? progress * 1000 - 1000 : 0,
        onCallback: (type: 'done' | 'left') => {
            if (type == 'done') {
                setTwentyPercentLeft(true)
                return setIsSound(true)
            }
            if (type == 'left') {
                return setTwentyPercentLeft(true)
            }
        },
    })

    // const onPatchAgenda = async (time) => {
    //     await axios.patch(`http://localhost:8000/api/agenda/${agendaId}/`, {
    //         progress_time: time,
    //     })
    // }

    const getRemainTime = () => {
        return Math.round(remainingTime / 1000)
    }

    const isUnderMinute = () => {
        return 60 > Math.round(remainingTime / 1000)
    }

    const increasePercent = () => {
        return +overSeconds > 0
            ? 100
            : 100 -
                  Math.floor(
                      (Math.round(remainingTime / 1000) / duration) * 100
                  )
    }

    const isRemainTwentyPercent = () => {
        return getRemainTime() / duration < 0.2
    }

    useEffect(() => {
        var water = document.getElementById('water')
        var cnt = document.getElementById('count')
        cnt.innerHTML = '100%'
        water.style.transform = `translate(0,${0}%)`
        initRef.current += 1
    }, [])

    useEffect(() => {
        if (initRef.current > -1) {
            // onPatchAgenda(
            //     duration - getRemainTime() + Math.round(overTime / 1000)
            // )
            handleProgressTime(
                duration - getRemainTime() + Math.round(overTime / 1000)
            )
            let box = document.querySelector<HTMLElement>('.box')
            var cnt = document.getElementById('count')
            var water = document.getElementById('water')
            let waveFront =
                document.querySelector<HTMLElement>('.water_wave_back')
            let waveBack =
                document.querySelector<HTMLElement>('.water_wave_front')

            const parseMinutes = parseInt(minutes) + 1
            cnt.innerHTML = '' + parseMinutes + '분'

            if (remainingTime != 0) {
                box.style.background = '#020438'
                cnt.style.color = '#fff'
                waveFront.style.display = 'block'
                waveBack.style.display = 'block'
                if (isRemainTwentyPercent() && !isUnderMinute()) {
                    water.style.background = '#ffc848'
                    waveFront.style.fill = '#ffc848'
                    waveBack.style.fill = '#ffe9b6'
                } else if (isUnderMinute()) {
                    water.style.background = '#f76f58'
                    waveFront.style.fill = '#f76f58'
                    waveBack.style.fill = '#fcd3bc'
                    cnt.innerHTML = '' + seconds + '초'
                } else {
                    water.style.background = '#5cbcad'
                    waveFront.style.fill = '#5cbcad'
                    waveBack.style.fill = '#bee4de'
                }
                water.style.transform = `translate(0,${0 + increasePercent()}%)`
            } else if (isSound) {
                box.style.background = '#0c254c'
                water.style.background = '#0c254c'
                waveFront.style.fill = '#0c254c'
                waveBack.style.fill = '#0c254c'
                cnt.innerHTML = ''
            } else if (!isSound && remainingTime <= 0) {
                box.style.background = '#384c6c'
                water.style.background = '#384c6c'
                cnt.style.color = '#e24646'
                waveFront.style.display = 'none'
                waveBack.style.display = 'none'

                cnt.innerHTML =
                    overMinutes !== '00'
                        ? `${overMinutes}분`
                        : `${overSeconds}초`
            }
        }
        return () => {
            soundStop()
        }
    }, [duration, seconds, minutes, overSeconds])

    //overTime이 1이 넘어가면 알람을 울린다
    // 알람을 ?초 동안 울리게 하고
    // 알람의 울림이 끝나면 overTime 을 보여준다.

    useEffect(() => {
        let timeout
        if (isSound && alarmSoundControl) {
            play()
            timeout = setTimeout(() => {
                setIsSound(false)
            }, 3000)
        }
        return () => clearTimeout(timeout)
    }, [isSound])

    return (
        <>
            <Container>
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns-xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    style={{ display: 'none' }}
                >
                    <symbol id="wave">
                        <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                        <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                        <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                        <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
                    </symbol>
                </svg>
                <div className="box">
                    <div className="percent">
                        <div className="percentNum" id="count">
                            0
                        </div>
                        <div className="percentB"></div>
                    </div>
                    {isSound && <Bell />}
                    <div id="water" className="water">
                        <svg
                            viewBox="0 0 560 20"
                            className="water_wave water_wave_back"
                        >
                            <use xlinkHref="#wave"></use>
                        </svg>
                        <svg
                            viewBox="0 0 560 20"
                            className="water_wave water_wave_front"
                        >
                            <use xlinkHref="#wave"></use>
                        </svg>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AnimationTimer
