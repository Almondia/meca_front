import localFont from '@next/font/local';

export const sahitya = localFont({
  src: [
    {
      path: '../public/fonts/Sahitya-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
});
