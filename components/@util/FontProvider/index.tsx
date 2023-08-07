/* eslint-disable react/no-unknown-property */
import React from 'react';

import { pretendard, sahitya } from '@/styles/font';

const FontProvider = () => (
  <style jsx global>{`
    :root {
      --font-base: ${pretendard.style.fontFamily};
      --font-sub: ${sahitya.style.fontFamily};
    }
  `}</style>
);

export default FontProvider;
