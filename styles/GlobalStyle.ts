import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { COLOR, MEDIA, SHADOW } from './constants';
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
        font-family: var(--font-base);
        --color-code1: #adbac7;
        --color-code2: #22272e;
        --color-code3: #f47067;
        --color-code4: #dcbdfb;
        --color-code5: #6cb6ff;
        --color-code6: #b2d8f7;
        --color-code7: #f69d50;
        --color-code8: #768390;
        --color-code9: #8ddb8c;
        --color-code10: #adbac7;
        --color-code11: #316dca;
        --color-code12: #eac55f;
        --color-code13: #adbac7;
        --color-code14: #adbac7;
        --color-code15: #b4f1b4;
        --color-code16: #1b4721;
        --color-code17: #ffd8d3;
        --color-code18: #78191b;
    }

    html {
        box-sizing: border-box;
        font-size: 18px;
        --color-brand: ${COLOR.brand1};
        --color-subbrand: ${COLOR.brand2};
        --color-subbrand2: ${COLOR.brand3};
        --color-background: ${COLOR.bgLight};
        --color-element-background: ${COLOR.bgEleLight};
        --color-backghround-shadow: rgba(0, 0, 0, 0.5);
        --color-text: ${COLOR.txtDark};
        --color-gray: ${COLOR.gray600};
        --color-lightgray: ${COLOR.gray100};
        --color-brightgray: rgba(232, 232, 232, 0.3);
        --shadow-normal: ${SHADOW.normalDark};
        --shadow-bold: ${SHADOW.boldDark};
        // TODO: lightmode 적용할 수 있다면
        /* --color-code1: #24292e;
        --color-code2: #ffffff;
        --color-code3: #d73a49;
        --color-code4: #6f42c1;
        --color-code5: #005cc5;
        --color-code6: #289928;
        --color-code7: #e36209;
        --color-code8: #6a737d;
        --color-code9: #22863a;
        --color-code10: #24292e;
        --color-code11: #005cc5;
        --color-code12: #735c0f;
        --color-code13: #24292e;
        --color-code14: #24292e;
        --color-code15: #22863a;
        --color-code16: #f0fff4;
        --color-code17: #b31d28;
        --color-code18: #ffeef0; */
    }

    @media ${MEDIA.mobile} {
        html {
            font-size: 16px;
        }
    }

    html[data-theme='dark'] {
        --color-brand: ${COLOR.brand2};
        --color-subbrand: ${COLOR.brand1};
        --color-subbrand2: ${COLOR.brand2};
        --color-background: ${COLOR.bgDark};
        --color-element-background: ${COLOR.bgEleDark};
        --color-backghround-shadow: rgba(255, 255, 255, 0.5);
        --color-text: ${COLOR.txtLight};
        --color-gray: ${COLOR.gray100};
        --color-lightgray: ${COLOR.gray600};
        --color-brightgray: rgba(128, 128, 128, 0.3);
        --shadow-normal: ${SHADOW.normalLight};
        --shadow-bold: ${SHADOW.boldLight};
    }

    body {
        min-height: 100vh;
        margin: 0 auto;
        padding: 0;
        background-color: var(--color-background);
        color: var(--color-text);
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    }

    strong {
        font-weight: 800;
    }

    em {
        font-style: italic;
    }
    
    a {
        color: var(--color-gray);
        text-decoration: none;
        outline: none
    }

    a:hover, a:active {
        color: var(--color-gray);
        text-decoration: none;
        background-color: transparent;
    }

    button {
        font-family: var(--font-base);
        cursor: pointer;
        border: none;
        outline: none;
        background-color: transparent;
        border-radius: ${({ border }) => border.button};
    }

    input, textarea {
        font-family: var(--font-base);
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
