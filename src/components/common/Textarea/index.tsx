import React, { memo, useCallback, useRef, ReactText, useEffect } from 'react'
import styled from 'styled-components'

export interface TextAreaProp {
    className?: string
    name: string
    value?: ReactText | ReadonlyArray<string>
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    onKeyDown?: any
    row?: number
}

const TextArea = ({
    className,
    name,
    value,
    onChange,
    placeholder,
    onKeyDown,
    row = 1,
}: TextAreaProp) => {
    const ref = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (ref === null || ref.current === null) {
            return
        }
        ref.current.style.height = `38px`
        ref.current.style.height = ref.current.scrollHeight + 'px'
    }, [row])

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return
        }
        ref.current.style.height = `38px`
        ref.current.style.height = ref.current.scrollHeight + 'px'
    }, [])

    return (
        <>
            <AutoResizeTextArea
                className={className}
                name={name}
                value={value}
                onChange={onChange}
                rows={row}
                placeholder={placeholder}
                ref={ref}
                onInput={handleResizeHeight}
            />
        </>
    )
}

const AutoResizeTextArea = styled.textarea`
    resize: none;
    /* overflow: hidden; */
    display: block;
    outline: none;
    padding: 12px 0;
    min-height: 38px;
    border-radius: 4px;
    caret-color: lightskyblue;
    box-sizing: border-box;
    line-height: 20px;
    width: 100%;
    height: 100%;
    &:focus {
        background: azure;
    }
`

export default TextArea
