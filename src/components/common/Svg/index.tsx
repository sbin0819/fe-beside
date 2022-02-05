import React from 'react'
export interface SvgProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    children: React.ReactNode
    style?: React.CSSProperties
    viewBox: string
    width?: string
    height?: string
}

const Svg = ({ children, style, ...props }: SvgProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            {...props}
            style={{
                flexShrink: 0,
                transition: 'all 0.2s ease',
                ...style,
            }}
        >
            {children}
        </svg>
    )
}

export default Svg
