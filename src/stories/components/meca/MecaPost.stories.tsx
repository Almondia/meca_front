import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaPost from '@/components/meca/organisms/MecaPost';
import { mockedGetMecaHistoryByCardApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';
import { PostPageLayout } from '@/styles/layout';

export default {
  title: 'components/meca/MecaPost',
  component: MecaPost,
  parameters: {
    componentSubtitle: '메모리 카드 게시글 컴포넌트',
    controls: {
      exclude: ['cardType', 'answer', 'question'],
    },
  },
} as ComponentMeta<typeof MecaPost>;

const Template: ComponentStory<typeof MecaPost> = (args) => {
  implementWorker([restHandler(mockedGetMecaHistoryByCardApi)]);
  return (
    <PostPageLayout>
      <MecaPost {...args} />
    </PostPageLayout>
  );
};

export const OxPost = Template.bind({});
OxPost.args = {
  cardType: 'OX_QUIZ',
  createdAt: '2023-03-25T02:13:28.061759',
  question: '문제다문제',
  answer: 'O',
};

export const SelectPost = Template.bind({});
SelectPost.args = {
  cardType: 'MULTI_CHOICE',
  createdAt: '2023-03-24T05:13:28.061759',
  question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
  answer: '1',
};

export const KeywordPost = Template.bind({});
KeywordPost.args = {
  cardType: 'KEYWORD',
  createdAt: '2023-03-20T02:13:28.061759',
  question: '박동석의 MBTI는 무엇인가요',
  answer: 'INFP',
  description:
    '<h4>nextjs에서 dynamic import로 quill editor 사용하기</h4><p>hello</p><p>맛이좋아<img src="https://my-meca.s3.ap-northeast-2.amazonaws.com/01876912-fddf-07f6-20ca-7cb2da7d3448/card/1681120302622.png"></p><p><strong class="ql-size-huge" style="color: rgb(230, 0, 0);"><em>돔돔ㄷ</em></strong></p>',
};

export const DescriptionPost = Template.bind({});
DescriptionPost.args = {
  cardType: 'ESSAY',
  createdAt: '2023-03-20T02:13:28.061759',
  question: '이벤트 루프를 설명해보세요',
  answer:
    'JavaScript 런타임 환경에서 동작하는 기능으로 callstack, callback queue, microtask queue를 감시하며 callstack이 비워졌을 경우 적절한 callback queue를 호출하도록 하는 비동기/논블로킹 동작의 핵심이 되는 기술',
  description:
    '<p></p><p><strong class="ql-size-large">이벤트 루프란?</strong></p><p><br></p><p><a href="https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">컴퓨터 과학</a>에서&nbsp;<strong>이벤트 루프</strong>(event loop),&nbsp;<strong>메시지 디스패처</strong>(message dispatcher),&nbsp;<strong>메시지 루프</strong>(message loop),&nbsp;<strong>메시지 펌프</strong>(message pump),&nbsp;<strong>런 루프</strong>(run loop)는&nbsp;<a href="https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">프로그램</a>의&nbsp;<a href="https://ko.wikipedia.org/wiki/%EC%82%AC%EA%B1%B4_%EA%B8%B0%EB%B0%98_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">이벤트</a>나&nbsp;<a href="https://ko.wikipedia.org/wiki/%EB%A9%94%EC%8B%9C%EC%A7%80_%EC%A0%84%EB%8B%AC_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">메시지</a>를 대기하다가 디스패치(효율적으로 처리)하는 프로그래밍 구조체이다. 일반적으로 이벤트가 도착할 때까지 요청을 차단하는 일부 내부 또는 외부의 "이벤트 제공자"에게 요청을 한 다음 관련&nbsp;<a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8_%ED%95%B8%EB%93%A4%EB%9F%AC" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">이벤트 핸들러</a>를 호출한다.(이 때 이벤트를 디스패치한다) 이벤트 제공자가 선택 또는 폴링되는(유닉스 시스템 호출에서 실제로&nbsp;<a href="https://ko.wikipedia.org/wiki/%ED%8F%B4%EB%A7%81" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">폴링</a>되지는 않음)&nbsp;<a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EB%A3%A8%ED%94%84#%ED%8C%8C%EC%9D%BC_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">파일 인터페이스</a>를 따르는 경우 이벤트 루프는&nbsp;<a href="https://ko.wikipedia.org/wiki/%EB%B0%98%EC%9D%91%EC%9E%90_%ED%8C%A8%ED%84%B4" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">반응자</a>와 결합해서 사용할 수 있다. 이벤트 루프는 거의 무조건 메시지 제공자와 비동기식으로 동작한다.</p><p>이벤트 루프가 중심&nbsp;<a href="https://ko.wikipedia.org/wiki/%EC%A0%9C%EC%96%B4_%ED%9D%90%EB%A6%84" rel="noopener noreferrer" target="_blank" style="background-color: initial; color: rgb(51, 102, 204);">제어 흐름</a>&nbsp;구조의 프로그램을 형성할 때 이를&nbsp;<strong>메인 루프</strong>(main loop) 또는&nbsp;<strong>메인 이벤트 루프</strong>(main event loop)라고 할 수 있다. 이벤트 루프가 프로그램 내의 최상위 통제를 받기 때문에 이러한 표현은 적절하다.</p><p><br></p>',
};
