import { BORDER, FONT_SIZE, FONT_WEIGHT, MEDIA } from './constants';

export interface Theme {
  media: typeof MEDIA;
  fontSize: typeof FONT_SIZE;
  fontWeight: typeof FONT_WEIGHT;
  border: typeof BORDER;
}

const commonTheme: Theme = {
  media: MEDIA,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  border: BORDER,
};

export default commonTheme;
