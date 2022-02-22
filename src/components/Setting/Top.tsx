import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MainInfoTitle, StyledInput, SubTitleContainer } from './style'

import { Svg } from '@common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import useMeetingActions from '@store/meeting/useMeetingActions'

const Container = styled.div`
    height: 316px;
    border-radius: 24px;
    margin: 15px 0 24px;
    padding: 32px 40px 40px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`

const TitleFormContainer = styled.div`
    margin-top: 36px;
    margin-bottom: 32px;
    .meet_info_title_inputs {
        display: flex;
        justify-content: space-between;
        .title_input {
            width: 714px;
        }
        .date_input {
            width: 322px;
        }
    }
`

const TagsInputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 48px;
    padding: 0 14px;
    border-radius: 12px;
    border: solid 1px #d6d6d7;
    background-color: #fff;
    display: flex;
    align-items: center;
    overflow: scroll;
    .tag-item {
        flex: 0 0 73px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f1f1f1;
        display: inline-block;
        margin-left: 3px;
        padding: 2px 8px;
        border-radius: 8px;
        .text {
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.43;
            letter-spacing: normal;
            text-align: left;
            color: #000;
            margin-right: 10px;
        }
        .close {
            height: 8px;
            color: #c0c0c2;
        }
    }
    input {
        padding: 20px 14px;
        width: 100%;
        min-width: 150px;
    }
`

function Top() {
    const { setMeetTitle, setMeetDate, setMeetParticipants } =
        useMeetingActions()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')
    const onChange = (e) => {
        const { value } = e.target
        setTitle(value)
        setMeetTitle({ meet_title: value })
    }
    const handlekeyPress = (e) => {
        if (e.key !== ',' && e.key !== ' ' && e.key !== 'Enter') return
        if (tag) {
            setTag('')
            setTags([...tags, tag])
        }
    }
    useEffect(() => {
        if (tags.length > 0) {
            setMeetParticipants({ participants: tags.join(',') })
        }
    }, [tags])
    return (
        <Container>
            <MainInfoTitle>회의 정보</MainInfoTitle>
            <TitleFormContainer>
                <SubTitleContainer>회의 제목</SubTitleContainer>
                <div
                    className="meet_info_title_inputs"
                    style={{ display: 'flex' }}
                >
                    <StyledInput
                        type="text"
                        className="title_input"
                        value={title}
                        onChange={onChange}
                    />
                    <div style={{ position: 'relative' }}>
                        <StyledInput
                            type="date"
                            className="date_input"
                            onChange={(e) => {
                                const { value } = e.target
                                const prefix = 'T16:20:00+09:00'
                                setDate(value)
                                setMeetDate({ meet_date: value + prefix })
                            }}
                            value={date}
                        />
                        {/* <Svg
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '5px',
                                transform: 'translate(-50%, -50%)',
                            }}
                            viewBox={calendarViewBox}
                            width={'20'}
                            height={'18'}
                        >
                            <Calendar />
                        </Svg> */}
                    </div>
                </div>
            </TitleFormContainer>
            <div className="meet_users">
                <SubTitleContainer>회의 참석자</SubTitleContainer>
                <TagsInputContainer>
                    {tags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                            <span className="text">{tag}</span>
                            <span className="close">&times;</span>
                        </div>
                    ))}

                    <input
                        onKeyPress={handlekeyPress}
                        type="text"
                        className="tags-input"
                        onChange={(e) => {
                            const { value } = e.target
                            const trim = value.replace(/[, ]/gim, '')
                            setTag(trim)
                        }}
                        value={tag.replace(/[, ]/gim, '')}
                    />
                </TagsInputContainer>
            </div>
        </Container>
    )
}

export default Top
