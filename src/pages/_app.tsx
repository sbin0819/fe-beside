import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import GlobalStyle from '@styles/GlobalStyle'
import { wrapper } from '../store/store'
import { Header, Footer } from '@components/common'
import useHeaderControl from '@hooks/useHeaderControl'
import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'
// import 'react-datepicker/dist/react-datepicker.css'
import { CookiesProvider } from 'react-cookie'

const app = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const { isHeader, desc, auth } = useHeaderControl()
    return (
        <SessionProvider session={session}>
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
                <CookiesProvider>
                    {isHeader && <Header desc={desc} />}
                    <Component {...pageProps} />
                    <Footer />
                </CookiesProvider>
            </SWRConfig>
        </SessionProvider>
    )
}

export default wrapper.withRedux(app)
