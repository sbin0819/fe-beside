import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        letter-spacing: -0.25px;
        line-height: 1.24;
    }
    html, body, #__next {
        height: 100%;
    }
    body{
        background-color: #ffffff;
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        font-weight: 400;
        overflow: hidden;
    }
    a, a:hover, a:active {
        color: inherit;
        text-decoration: none;
        outline: none;
    }
    body input, body button, body pre {
        background-color: transparent;
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        font-weight: 400;
        border: none;
        outline: none;
    }
    textarea{
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        border: none;
        outline: none;
    }
    ol, ul, li {
        list-style: none;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .hidden_scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    }
`

export default GlobalStyle
