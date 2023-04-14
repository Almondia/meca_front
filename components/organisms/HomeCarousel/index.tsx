import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';

import { TextBody } from '@/styles/common';
import { COLOR } from '@/styles/constants';

import { HomeCarouselContent, HomeCarouselContentBackground, HomeCarouselSlider, HomeCarouselWrapper } from './styled';

const HomeCarousel = () => (
  <HomeCarouselWrapper>
    <HomeCarouselSlider speed={500} dots arrows={false} infinite>
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
            <Image src="/images/mainimg1.png" alt="main-image1" fill />
          </div>
        </HomeCarouselContent>
      </HomeCarouselContentBackground>
      <HomeCarouselContentBackground backgroundColor={COLOR.success}>
        <HomeCarouselContent>
          <div>
            <h4>내가 만드는 너를 위한 학습 카드</h4>
            <TextBody>
              나(Me)를 위해 기억(Memory)해야 할 것들을 <br />
              카드로 만들어 학습하고 복습해요
            </TextBody>
          </div>
          <div>
            <Image src="/images/mainimg1.png" alt="main-image1" fill />
          </div>
        </HomeCarouselContent>
      </HomeCarouselContentBackground>
    </HomeCarouselSlider>
  </HomeCarouselWrapper>
);

export default HomeCarousel;
