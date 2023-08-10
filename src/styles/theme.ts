import { BORDER, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, MEDIA } from './constants';

export interface Theme {
  media: typeof MEDIA;
  fontSize: typeof FONT_SIZE;
  fontWeight: typeof FONT_WEIGHT;
  border: typeof BORDER;
  fontFamily: typeof FONT_FAMILY;
}

const commonTheme: Theme = {
  media: MEDIA,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  border: BORDER,
  fontFamily: FONT_FAMILY,
};

export default commonTheme;
