import React from 'react'
export const timerViewBox = '0 0 32 32'
export const Timer = () => {
    return (
        <>
            <svg
                width="32"
                height="32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13 2a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6zm3 9a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm12 7c0 6.627-5.373 12-12 12S4 24.627 4 18 9.373 6 16 6s12 5.373 12 12zm-2 0c0-5.523-4.477-10-10-10S6 12.477 6 18s4.477 10 10 10 10-4.477 10-10zm.708-11.707a1 1 0 1 0-1.414 1.414l2 2a1 1 0 1 0 1.414-1.415l-2-2z"
                    fill="#fff"
                />
            </svg>
        </>
    )
}
