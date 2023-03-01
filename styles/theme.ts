import { DefaultTheme } from 'styled-components';

import { BORDER, COLOR, FONT_SIZE, MEDIA, SHADOW } from './constants';

export interface Theme extends DefaultTheme {
  backgroundColor: string;
  textColor: string;
  brandColor: string;
  grey: string;
  lightGrey: string;
  media: typeof MEDIA;
  fontSize: typeof FONT_SIZE;
  border: typeof BORDER;
  shadow: {
    normal: string;
    bold: string;
  };
}

const commonTheme: Pick<Theme, 'media' | 'fontSize' | 'border'> = {
  media: MEDIA,
  fontSize: FONT_SIZE,
  border: BORDER,
};

const lightTheme: Theme = {
  backgroundColor: COLOR.bgLight,
  textColor: COLOR.txtDark,
  brandColor: COLOR.brand1,
  grey: COLOR.gray600,
  lightGrey: COLOR.gray100,
  shadow: {
    normal: SHADOW.normalDark,
    bold: SHADOW.boldDark,
  },
  ...commonTheme,
};

const darkTheme: Theme = {
  backgroundColor: COLOR.bgDark,
  textColor: COLOR.txtLight,
  brandColor: COLOR.brand2,
  grey: COLOR.gray200,
  lightGrey: COLOR.gray800,
  shadow: {
    normal: SHADOW.normalLight,
    bold: SHADOW.boldLight,
  },
  ...commonTheme,
};

const themeMode = {
  light: lightTheme,
  dark: darkTheme,
};

export default themeMode;
