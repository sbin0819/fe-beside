import React, { useState, useEffect, useRef } from 'react'
// import Slide from './Slide'
import styled from 'styled-components'
import img1 from '../../../public/image/assets/landing/onboarding_01.png'
import img2 from '../../../public/image/assets/landing/onboarding_02.png'
import img3 from '../../../public/image/assets/landing/onboarding_03.png'
import img4 from '../../../public/image/assets/landing/onboarding_04.png'
import img5 from '../../../public/image/assets/landing/onboarding_05.png'

const TOTAL_SLIDES = 4

function Landing() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideRef = useRef(null)
    const [loop, setLoop] = useState(null)

    useEffect(() => {
        const swiperLoop = setTimeout(() => {
            if (currentSlide >= TOTAL_SLIDES) {
                setCurrentSlide(0)
            } else {
                setCurrentSlide(currentSlide + 1)
            }
        }, 3000)
        setLoop(swiperLoop)
        // }
        return clearTimeout(loop)
    }, [currentSlide, setCurrentSlide])

    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) {
            // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0)
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }
    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out'
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)` // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide])

    const datas = [
        { id: 0, img: '/image/assets/landing/onboarding_01.png' },
        { id: 1, img: '/image/assets/landing/onboarding_02.png' },
        { id: 2, img: '/image/assets/landing/onboarding_03.png' },
        { id: 3, img: '/image/assets/landing/onboarding_04.png' },
        { id: 4, img: '/image/assets/landing/onboarding_05.png' },
    ]
    // console.log(datas.length)
    const showDivs = (idx) => {
        // const index = datas.length - 1;
        const index = currentSlide
        if (0 < idx && idx === index) {
            setCurrentSlide(idx)
        } else if (idx < 0) {
            setCurrentSlide(currentSlide - 1)
        } else if (idx > index) {
            setCurrentSlide(0)
        } else if (idx < index) {
            setCurrentSlide(index)
        }
    }

    const onCurrent = (id) => {
        showDivs(id)
    }

    return (
        <Container>
            {currentSlide}
            <SliderContainer ref={slideRef}>
                {/* <Slide src="/image/assets/landing/onboarding_01.png" /> */}
                {/* <Slide src="/image/assets/landing/onboarding_02.png" /> */}
                {/* <Slide src="/image/assets/landing/onboarding_03.png" /> */}
                {/* <Slide src="/image/assets/landing/onboarding_04.png" /> */}
                {/* <Slide src="/image/assets/landing/onboarding_05.png" /> */}
                {/* <Slide src={datas[0]} /> */}
                {datas.map((data) => {
                    return <Slide key={data.id} src={data.img} />
                })}
            </SliderContainer>
            {datas.map((data) => (
                <Dot
                    active={currentSlide === data.id ? true : false}
                    onClick={() => onCurrent(data.id)}
                    key={data.id}
                />
            ))}

            {/* <Dot active={} /> */}

            <Button onClick={prevSlide}>Previous Slide</Button>
            <Button onClick={nextSlide}>Next Slide</Button>
        </Container>
    )
}
const Dot = styled.span<{ active?: boolean }>`
    height: 15px;
    width: 15px;
    padding: 0;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    display: inline-block;
    border: 1px solid #ccc;
    background-color: ${(prop) => (prop.active ? '#fff' : 'transparent')};
    &: hover {
        color: #000 !important;
        background-color: #fff;
    }
`

const Slide = styled.img`
    width: 480px;
    height: 480px;
`
const Container = styled.div`
    margin-top: 50px;
    margin-left: 100px;
    width: 480px;
    overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`
const Button = styled.button`
    all: unset;
    border: 1px solid coral;
    padding: 0.5em 2em;
    color: coral;
    border-radius: 10px;
    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: coral;
        color: #fff;
    }
`
const SliderContainer = styled.div`
    width: 100%;
    display: flex; //이미지들을 가로로 나열합니다.
`
export default Landing
