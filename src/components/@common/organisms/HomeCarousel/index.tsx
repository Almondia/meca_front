import Image from 'next/image';

import { memo } from 'react';

import { TextBody } from '@/styles/common';
import { COLOR, MEDIA } from '@/styles/constants';

import { HomeCarouselContent, HomeCarouselContentBackground, HomeCarouselSlider, HomeCarouselWrapper } from './styled';

// eslint-disable-next-line import/no-absolute-path
import MainImage from '/public/images/mainimg1.png';

import 'slick-carousel/slick/slick.css';

const HomeCarousel = memo(() => (
  <HomeCarouselWrapper>
    <HomeCarouselSlider speed={1500} dots arrows={false} infinite autoplay autoplaySpeed={5000}>
      <HomeCarouselContentBackground backgroundColor="var(--color-subbrand2)">
        <HomeCarouselContent>
          <div>
            <h4>내가 만드는 나를 위한 학습 카드</h4>
            <TextBody>
              나(Me)를 위해 기억(Memory)해야 할 것들을 <br />
              카드로 만들어 학습하고 복습해요
            </TextBody>
          </div>
          <div>
            <Image
              src={MainImage}
              alt="main-image1"
              priority
              width={735}
              height={232}
              sizes={`${MEDIA.mobile} 75vw, 730px`}
            />
          </div>
        </HomeCarouselContent>
      </HomeCarouselContentBackground>
      <HomeCarouselContentBackground backgroundColor={COLOR.success}>
        <HomeCarouselContent>
          <div>
            <h4>기억의 성지로 활용해요</h4>
            <TextBody>원하는 퀴즈를 만들고 원하는 방식으로 기억해요</TextBody>
          </div>
          <div>
            <Image
              src={MainImage}
              alt="main-image2"
              width={735}
              height={232}
              placeholder="blur"
              sizes={`${MEDIA.mobile} 75vw, 730px`}
            />
          </div>
        </HomeCarouselContent>
      </HomeCarouselContentBackground>
    </HomeCarouselSlider>
  </HomeCarouselWrapper>
));

export default HomeCarousel;
