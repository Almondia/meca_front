import { BORDER, COLOR, FONT_SIZE, FONT_WEIGHT, MEDIA, SHADOW } from './constants';

export interface Theme {
  backgroundColor: string;
  textColor: string;
  brandColor: string;
  /** light: 600 / dark: 200 */
  gray: string;
  /** light: 100 / dark: 800 */
  lightGray: string;
  media: typeof MEDIA;
  fontSize: typeof FONT_SIZE;
  fontWeight: typeof FONT_WEIGHT;
  border: typeof BORDER;
  shadow: {
    normal: string;
    bold: string;
  };
}

const commonTheme: Pick<Theme, 'media' | 'fontSize' | 'fontWeight' | 'border'> = {
  media: MEDIA,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  border: BORDER,
};

const lightTheme: Theme = {
  backgroundColor: COLOR.bgLight,
  textColor: COLOR.txtDark,
  brandColor: COLOR.brand1,
  gray: COLOR.gray600,
  lightGray: COLOR.gray100,
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
  gray: COLOR.gray200,
  lightGray: COLOR.gray800,
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
