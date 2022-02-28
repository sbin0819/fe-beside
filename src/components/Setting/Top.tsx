import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
    MainInfoTitle,
    StyledInput,
    SettingInputContinaer,
    SubTitleContainer,
    InputInfoContainer,
} from './style'

import { Svg } from '@common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { MeetForm } from './useSetting'
import moment from 'moment'

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

const TagsInputContainer = styled.div<{
    isInValid?: boolean
    isFocus?: boolean
}>`
    position: relative;
    width: 100%;
    height: 48px;
    padding: 0 14px;
    border-radius: 12px;
    border: solid 1px
        ${({ isInValid, isFocus }) =>
            isInValid ? 'red' : isFocus ? '#748298' : '#d6d6d7'};

    background-color: #fff;
    display: flex;
    align-items: center;
    overflow: scroll;
    .tag-item {
        justify-content: space-between;
        align-items: center;
        background: #f1f1f1;
        margin-left: 3px;
        padding: 2px 8px;
        border-radius: 8px;
        display: flex;
        word-break: keep-all;
        .text {
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.43;
            letter-spacing: normal;
            color: #000;
            margin-right: 10px;
        }
        .close {
            cursor: pointer;
            color: #c0c0c2;
        }
    }
    input {
        padding: 20px 14px;
        width: 100%;
        min-width: 150px;
    }
`

const InputInfoContainerType2 = styled.div`
    position: relative;
    top: 4px;
    left: 10px;
    color: #e24646;
    font-size: 12px;
`

function Top({ form, setForm }: { form: MeetForm; setForm: any }) {
    const initRef = useRef(-1)
    const { meet_title, meet_date, participants } = form
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')
    const onChange = (e) => {
        const { value } = e.target
        setForm((prev) => ({
            ...prev,
            meet_title: { ...prev.meet_title, value },
        }))
    }

    const onFocus = (e) => {
        const { name } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                focus: true,
                message: '',
                error: false,
            },
        }))
    }
    const onBlur = (e) => {
        const { name } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: { ...prev[name], focus: false, message: '' },
        }))
    }

    const handlekeyPress = (e) => {
        if (e.key !== ',' && e.key !== ' ' && e.key !== 'Enter') return
        if (tag) {
            setTag('')
            setTags([...tags, tag])
        }
    }

    const onDeleteParticipants = (target) => {
        const filteredTags = tags.filter((_, i) => i !== target)
        setTags(filteredTags)
    }
    useEffect(() => {
        if (tags.length > 0) {
            setForm((prev) => ({
                ...prev,
                participants: { ...prev.meet_title, value: tags.join(',') },
            }))
        }
    }, [tags])

    useEffect(() => {
        if (participants.value && initRef.current == -1) {
            initRef.current += 1
            setTags(participants.value.split(','))
        }
    }, [participants])

    return (
        <Container>
            <MainInfoTitle>회의 정보</MainInfoTitle>
            <TitleFormContainer>
                <SubTitleContainer>회의 제목</SubTitleContainer>
                <div
                    className="meet_info_title_inputs"
                    style={{ display: 'flex', position: 'relative' }}
                >
                    <StyledInput
                        type="text"
                        className="title_input"
                        name="meet_title"
                        value={meet_title.value}
                        onChange={onChange}
                        isInValid={meet_title.error}
                        isFocus={meet_title.focus}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {(meet_title.error || meet_title.focus) && (
                        <InputInfoContainer isInValid={meet_title.error}>
                            {meet_title.message}
                        </InputInfoContainer>
                    )}
                    <SettingInputContinaer>
                        <StyledInput
                            type="date"
                            className="date_input"
                            name="meet_date"
                            onChange={(e) => {
                                const { value } = e.target
                                const offset = 'T16:20:00+09:00'
                                setForm((prev) => ({
                                    ...prev,
                                    meet_date: {
                                        ...prev.meet_date,
                                        value: value + offset,
                                    },
                                }))
                            }}
                            value={moment(meet_date.value).format('YYYY-MM-DD')}
                            isInValid={meet_date.error}
                            isFocus={meet_date.focus}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                        <Svg
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
                        </Svg>
                        {(meet_date.error || meet_date.focus) && (
                            <InputInfoContainer isInValid={meet_date.error}>
                                {meet_date.message}
                            </InputInfoContainer>
                        )}
                    </SettingInputContinaer>
                </div>
            </TitleFormContainer>
            <div>
                <SubTitleContainer>회의 참석자</SubTitleContainer>
                <TagsInputContainer
                    isInValid={participants.error}
                    isFocus={participants.focus}
                >
                    {tags.map((tag, index) => (
                        <div
                            className="tag-item"
                            key={`${tag}-${index.toString()}`}
                        >
                            <div className="text">{tag}</div>
                            <div
                                className="close"
                                onClick={() => onDeleteParticipants(index)}
                            >
                                &times;
                            </div>
                        </div>
                    ))}

                    <input
                        onKeyPress={handlekeyPress}
                        type="text"
                        className="tags-input"
                        name="participants"
                        onChange={(e) => {
                            const { value } = e.target
                            const trim = value.replace(/[, ]/gim, '')
                            setTag(trim)
                        }}
                        value={tag.replace(/[, ]/gim, '')}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </TagsInputContainer>
                {participants.error && (
                    <InputInfoContainerType2>
                        {participants.message}
                    </InputInfoContainerType2>
                )}
            </div>
        </Container>
    )
}

export default Top
