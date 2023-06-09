export const MOCK_CATEGORY_ID = '01234567-89ab-cdef-0123-456789abcd24';
export const MOCK_MEMBER_ID = '01234567-89ab-cdef-0123-456789abcdef';

/**
 * 목록 카테고리 조회 및 CUD에 사용
 */
export const MOCK_CATEGORIES = [...Array(36)].map((v, i) => {
  const obj = {};
  obj.categoryId = '01234567-89ab-cdef-0123-456789abcd' + i.toString().padStart(2, '0');
  obj.title = 'title' + i;
  obj.createdAt = i;
  obj.thumbnail = '';
  obj.shared = true;
  return obj;
});

/**
 * 목록 카드 조회 및 CUD에 사용
 */
export const MOCK_MECAS = [...Array(24)].map((v, i) => {
  const obj = {};
  obj.categoryId = MOCK_CATEGORY_ID;
  obj.cardId = '01234567-89ab-cdef-0123-456789abcd' + i.toString().padStart(2, '0');
  obj.title = 'title' + i;
  obj.cardType = 'KEYWORD';
  obj.answer = 'answer' + i;
  obj.question = 'question' + i;
  return obj;
});

export const MOCK_MEMBER = {
  memberId: MOCK_MEMBER_ID,
  name: '임현규',
  email: 'abc@abc.com',
  role: 'USER',
  profile: '',
  oauthType: 'KAKAO',
  createdAt: '2023-03-11T12:56:22.954816',
  accessToken: 'token',
};

export const MOCK_MECA = {
  title: 'Small Soft Computer',
  memberId: MOCK_MEMBER_ID,
  question: 'February',
  categoryId: MOCK_CATEGORY_ID,
  cardType: 'OX_QUIZ',
  createdAt: '2023-04-18T16:38:33.936941',
  modifiedAt: '2023-04-18T16:38:33.936941',
  answer: 'O',
  description: 'edit text',
};

export const MOCK_SHARED_MECA = {
  cardInfo: MOCK_MECA,
  memberInfo: MOCK_MEMBER,
};

export const MOCK_SHARED_MECAS = {
  contents: [
    {
      cardInfo: {
        cardId: '018778b0-2f94-072f-336f-f2cbf49d077d',
        title: 'Rustic Granite Chips',
        question: 'March',
        categoryId: MOCK_CATEGORY_ID,
        cardType: 'OX_QUIZ',
        createdAt: '2023-04-13T12:37:05.175337',
        modifiedAt: '2023-04-13T12:37:05.175337',
        answer: 'O',
        description: 'edit text',
      },
      memberInfo: MOCK_MEMBER,
    },
  ],
  hasNext: '018778b0-2148-8c6c-a6ed-bb91cad56205',
  pageSize: 2,
  sortOrder: 'DESC',
  category: {
    categoryId: MOCK_CATEGORY_ID,
    memberId: MOCK_MEMBER_ID,
    thumbnail: 'https://www.google.c',
    title: 'title12352',
    createdAt: '2023-04-13T12:36:41.964544',
    modifiedAt: '2023-04-13T12:36:44.912056',
    shared: true,
    deleted: false,
    likeCount: 5,
  },
};

export const MOCK_HISTORY_LIST = {
  contents: [
    {
      cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd00',
      solvedUserId: MOCK_MEMBER_ID,
      solvedUserName: '이름이엄청길수도있어요',
      userAnswer: 'answer',
      score: 62,
      categoryId: MOCK_CATEGORY_ID,
      cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
      createdAt: '2023-05-28T21:34:22.6543507',
      title: 'title',
      question: '박동석의 MBTI는 무엇일까요?',
      answer: 'answer',
      cardType: 'KEYWORD',
    },
    {
      cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
      solvedUserId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
      solvedUserName: 'name',
      userAnswer: '1',
      score: 0,
      categoryId: MOCK_CATEGORY_ID,
      cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
      createdAt: '2023-05-24T21:34:22.6543507',
      title: 'title',
      question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
      answer: '1',
      cardType: 'MULTI_CHOICE',
    },
  ],
  hasNext: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
  pageSize: 2,
};
