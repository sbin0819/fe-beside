import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import GlobalStyle from '@styles/GlobalStyle'
import { wrapper } from '../store/store'
import { Header, Footer } from '@components/common'
import useHeaderControl from '@hooks/useHeaderControl'
import { SWRConfig } from 'swr'
// import 'react-datepicker/dist/react-datepicker.css'

const app = ({ Component, pageProps }: AppProps) => {
    const { isHeader, desc, auth } = useHeaderControl()
    return (
        <SWRConfig
            value={{
                fetcher: (url: string) =>
                    fetch(url, {
                        headers: {
                            Authorization: auth ? auth : '',
                        },
                        credentials: 'include',
                    }).then((response) => response.json()),
            }}
        >
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
                />
                <link rel="shortcut icon" href="favicon.ico" />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
                />
            </Head>
            <GlobalStyle />
            {isHeader && <Header desc={desc} />}
            <Component {...pageProps} />
            <Footer />
        </SWRConfig>
    )
}

export default wrapper.withRedux(app)
