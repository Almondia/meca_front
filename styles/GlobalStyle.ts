import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { COLOR, MEDIA } from './constants';
import { Theme } from './theme';

const GlobalStyle = createGlobalStyle<Theme>`
    ${reset}

    :root {
        --color-background-dark: ${COLOR.bgDark};
        --color-background-light: ${COLOR.bgLight};
        --color-text-light: ${COLOR.txtLight};
        --color-text-dark: ${COLOR.txtDark};
        --color-success: ${COLOR.success};
        --color-warning: ${COLOR.warning};
        --color-error: ${COLOR.error};
        --color-gray50: ${COLOR.gray50};
        --color-gray100: ${COLOR.gray100};
        --color-gray200: ${COLOR.gray200};
        --color-gray400: ${COLOR.gray400};
        --color-gray600: ${COLOR.gray600};
        --color-gray800: ${COLOR.gray800};
        --is-mobile: ${MEDIA.mobile};
        --is-tablet: ${MEDIA.tablet};
    }

    html {
        font-family: 'Pretendard', sans-serif;
        box-sizing: border-box;
        font-size: 16px;
    }

    body {
        min-height: 100vh;
        margin: 0;
        padding: 0;
        background-color: ${({ backgroundColor }) => backgroundColor};
        color: ${({ textColor }) => textColor};
    }

    a {
        color: ${({ gray }) => gray};
        text-decoration: none;
        outline: none
    }

    a:hover, a:active {
        color: ${({ gray }) => gray};
        text-decoration: none;
        background-color: transparent;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        background-color: transparent;
        border-radius: ${({ border }) => border.button};
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    h2 {
        font-size: 3.625rem;
        font-weight: ${({ fontWeight }) => fontWeight.bold};
        line-height: 4.31rem;
    }

    h4 {
        font-size: 2rem;
        font-weight: ${({ fontWeight }) => fontWeight.bold};
        line-height: 2.375rem;
    }

    h5 {
        font-size: 1.5rem;
        font-weight: ${({ fontWeight }) => fontWeight.bold};
    }
`;
export default GlobalStyle;
