import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '@styles/GlobalStyle'
import { wrapper } from '../store/store'

import Head from 'next/head'

const app = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
                />
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>

            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(app)
