import 'slick-carousel/slick/slick.css';

import Image from 'next/image';

import React from 'react';

import MainImage from '@/public/images/mainimg1.png';
import { TextBody } from '@/styles/common';
import { COLOR, MEDIA } from '@/styles/constants';

import { HomeCarouselContent, HomeCarouselContentBackground, HomeCarouselSlider, HomeCarouselWrapper } from './styled';

const HomeCarousel = () => (
  <HomeCarouselWrapper>
    <HomeCarouselSlider speed={1500} dots arrows={false} infinite autoplay autoplaySpeed={5000}>
      <HomeCarouselContentBackground backgroundColor={COLOR.brand3}>
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
            <h4>내가 만드는 너를 위한 학습 카드</h4>
            <TextBody>
              너를 위해 기억해야 할 것들을 <br />
              카드로 만들어 같이 공유해요
            </TextBody>
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
);

export default React.memo(HomeCarousel);
