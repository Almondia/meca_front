import type {
  Category,
  CategoryListContent,
  CategoryListPaginationResponse,
  CategoryStatistics,
} from '@/types/domain/category';
import type { Meca, MecaListContent, MecaListPaginationResponse } from '@/types/domain/meca';
import type { MecaHistoryListPaginationResponse } from '@/types/domain/mecaHistory';
import type { Quiz, QuizSimulationStateResponse } from '@/types/domain/quiz';
import type { MyProfile, User } from '@/types/domain/user';

export const MOCK_CATEGORY_ID = '01234567-89ab-cdef-0123-456789abcd24';
export const MOCK_MECA_ID = '01234567-89ab-cdef-0123-456789abcd24';
export const MOCK_MEMBER_ID = '01234567-89ab-cdef-0123-456789abcdef';

export const MOCK_MEMBER: MyProfile = {
  memberId: MOCK_MEMBER_ID,
  name: '임현규',
  email: 'abc@abc.com',
  profile: '',
  oauthType: 'kakao',
  createdAt: '2023-03-11T12:56:22.954816',
  accessToken: 'token',
};

export const MOCK_RESPONSE_MEMBER: User = {
  memberId: MOCK_MEMBER_ID,
  name: '임현규',
  profile: '',
};

export const MOCK_CATEGORIES: Category[] = [...Array(36)].map((_: any, i: number) => {
  return {
    categoryId: '01234567-89ab-cdef-0123-456789abcd' + i.toString().padStart(2, '0'),
    memberId: MOCK_MEMBER_ID,
    title: 'title' + i,
    thumbnail: '',
    shared: true,
    createdAt: '2023-08-09T18:54:16.92176' + i.toString().padStart(2, '0'),
  };
});

export const MOCK_CATEGORY: Category = {
  categoryId: MOCK_CATEGORY_ID,
  memberId: MOCK_MEMBER_ID,
  thumbnail: '',
  title: 'title1',
  createdAt: '2023-08-09T18:54:04.3869113',
  shared: true,
};

export const MOCK_CATEGORY_STATISTICS: CategoryStatistics = {
  scoreAvg: 50,
  solveCount: 10,
  totalCount: 20,
};

export const MOCK_CATEGORY_PAGINATION_LIST: CategoryListPaginationResponse = {
  contents: [
    {
      category: {
        categoryId: '018819c4-e42d-1534-5c24-89c19a260cc9',
        memberId: '018819c4-e42d-1534-5c24-89c19a260cc8',
        thumbnail: '',
        title: 'title1',
        createdAt: '2023-05-14T19:18:33.9016305',
        shared: true,
      },
      member: {
        memberId: '018819c4-e42d-1534-5c24-89c19a260cca',
        name: 'name',
        profile: '',
      },
      likeCount: 10,
    },
    {
      category: {
        categoryId: '018819c4-e42d-1534-5c24-89c19a260cc0',
        memberId: '018819c4-e42d-1534-5c24-89c19a260cc0',
        thumbnail: '',
        title: 'title2',
        createdAt: '2023-05-14T19:18:33.9016305',
        shared: true,
      },
      member: {
        memberId: '018819c4-e42d-1534-5c24-89c19a260cc0',
        name: 'name',
        profile: '',
      },
      likeCount: 0,
    },
  ],
  hasNext: null,
  pageSize: 2,
  sortOrder: 'DESC',
};

export const MOCK_CATEGORY_CONTENT: CategoryListContent = {
  category: MOCK_CATEGORY,
  statistics: MOCK_CATEGORY_STATISTICS,
  likeCount: 5,
  member: MOCK_RESPONSE_MEMBER,
};

export const MOCK_MECAS: (Omit<Meca, 'description' | 'answer'> & { description?: string })[] = [...Array(36)].map(
  (_: any, i: number) => {
    return {
      cardId: '01234567-89ab-cdef-0123-456789abcd' + i.toString().padStart(2, '0'),
      categoryId: MOCK_CATEGORY_ID,
      memberId: MOCK_MEMBER_ID,
      title: 'title' + i,
      question: 'question' + i,
      thumbnail: '',
      cardType: 'KEYWORD',
      createdAt: '2023-08-09T18:54:16.92176' + i.toString().padStart(2, '0'),
    };
  },
);

export const MOCK_MECA: Meca = {
  cardId: MOCK_MECA_ID,
  title: 'Small Soft Computer',
  memberId: MOCK_MEMBER_ID,
  question: 'February',
  categoryId: MOCK_CATEGORY_ID,
  cardType: 'OX_QUIZ',
  createdAt: '2023-04-18T16:38:33.936941',
  answer: 'O',
  description: 'edit text',
};

export const MOCK_MECA_CONTENT: MecaListContent = {
  card: MOCK_MECA,
  statistics: {
    scoreAvg: 15.5,
    tryCount: 5,
  },
};

export const MOCK_MECA_PAGINATION_LIST: MecaListPaginationResponse = {
  contents: [
    {
      card: {
        cardId: '0189d9b7-bbe1-13b5-d5dc-8a764ce04e1c',
        title: 'title',
        memberId: MOCK_MEMBER_ID,
        question: 'question',
        categoryId: MOCK_CATEGORY_ID,
        cardType: 'OX_QUIZ',
        createdAt: '2023-08-09T18:54:04.3859122',
        description: 'description',
      },
      statistics: {
        scoreAvg: 24.5,
        tryCount: 14,
      },
    },
    {
      card: {
        cardId: '0189d9b7-bbe1-13b5-d5dc-8a764ce04e1d',
        title: 'title2',
        memberId: MOCK_MEMBER_ID,
        question: 'question2',
        categoryId: MOCK_CATEGORY_ID,
        cardType: 'OX_QUIZ',
        createdAt: '2023-08-09T18:54:04.3859122',
        description: 'description',
      },
      statistics: {
        scoreAvg: 45.5,
        tryCount: 5,
      },
    },
  ],
  hasNext: null,
  pageSize: 2,
  sortOrder: 'DESC',
  category: {
    categoryId: MOCK_CATEGORY_ID,
    memberId: MOCK_MEMBER_ID,
    thumbnail: 'thumbnail',
    title: 'title',
    createdAt: '2023-08-09T18:54:04.3869113',
    shared: true,
  },
  member: MOCK_RESPONSE_MEMBER,
  categoryLikeCount: 0,
};

export const MOCK_HISTORY_LIST: MecaHistoryListPaginationResponse = {
  contents: [
    {
      cardHistory: {
        cardHistoryId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf2b',
        userAnswer: 'answer',
        score: 21,
        createdAt: '2023-06-16T14:24:57.2667251',
      },
      solvedMember: {
        solvedMemberId: MOCK_MEMBER_ID,
        solvedMemberName: 'simon',
      },
      card: {
        cardId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf29',
        categoryId: MOCK_CATEGORY_ID,
        memberId: MOCK_MEMBER_ID,
        title: 'title',
        question: 'question',
        answer: 'O',
        cardType: 'OX_QUIZ',
        description: 'description',
        createdAt: '2023-06-16T14:24:57.2667251',
      },
    },
    {
      cardHistory: {
        cardHistoryId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf2z',
        userAnswer: 'answer',
        score: 21,
        createdAt: '2023-06-16T14:24:57.2667251',
      },
      solvedMember: {
        solvedMemberId: MOCK_MEMBER_ID,
        solvedMemberName: 'simon',
      },
      card: {
        cardId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf30',
        categoryId: MOCK_CATEGORY_ID,
        memberId: MOCK_MEMBER_ID,
        title: 'title2',
        question: 'question2',
        answer: 'answer',
        cardType: 'KEYWORD',
        description: 'description',
        createdAt: '2023-06-16T14:24:57.2667251',
      },
    },
  ],
  hasNext: null,
  pageSize: 2,
  sortOrder: 'DESC',
};

export const MOCK_QUIZS: Quiz[] = [
  {
    cardId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1180',
    title: '박동석 알아보기',
    memberId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1181',
    question: '박동석의 MBTI는 무엇인가',
    categoryId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1182',
    cardType: 'KEYWORD',
    createdAt: '2023-08-09T18:54:04.3399113',
    answer: 'INFP',
    description: 'description',
  },
  {
    cardId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1181',
    title: '박동석 알아보기',
    memberId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1181',
    question: '박동석의 MBTI는 ENFJ이다.',
    categoryId: '0189d9b7-bbb3-04a7-2b4c-5efa549d1182',
    cardType: 'OX_QUIZ',
    createdAt: '2023-08-09T18:54:04.3399114',
    answer: 'x',
    description: 'description',
  },
];

export const MOCK_CATEGORY_PAGINATION_LIST_PRESENT: CategoryListPaginationResponse = {
  contents: [
    {
      category: {
        categoryId: '1',
        memberId: '1',
        title: 'What is Lorem Ipsum',
        thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/b2ee4537-330f-4fc8-9360-c8902f2b2ce5',
        shared: true,
        createdAt: '',
      },
      member: {
        memberId: '1',
        profile: '',
        name: 'Terry Collins',
      },
      likeCount: 0,
    },
    {
      category: {
        categoryId: '2',
        memberId: '2',
        title: 'The standard Lorem Ipsum passage, used since the 1500s',
        thumbnail: '',
        shared: true,
        createdAt: '',
      },
      member: {
        memberId: '2',
        profile: '',
        name: '김갑환의 봉황각',
      },
      likeCount: 0,
    },
    {
      category: {
        categoryId: '3',
        memberId: '3',
        title: 'Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        thumbnail: '',
        shared: true,
        createdAt: '',
      },
      member: {
        memberId: '3',
        profile: '',
        name: '일이삼사오육칠팔구십',
      },
      likeCount: 14,
    },
    {
      category: {
        categoryId: '4',
        memberId: '4',
        title: '오키오키오키나와',
        thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/24cb26a7-e284-45c9-a9d0-d9dfb5e6baa6',
        shared: true,
        createdAt: '',
      },
      member: {
        memberId: '4',
        profile: '',
        name: 'name',
      },
      likeCount: 5,
    },
    {
      category: {
        categoryId: '5',
        memberId: '5',
        title: '가슴이 웅장해지는 김갑환의 봉황각',
        thumbnail:
          'https://github-production-user-asset-6210df.s3.amazonaws.com/76927397/245342957-cdf35a58-74e6-4682-a78f-d3fee75189f7.gif',
        shared: true,
        createdAt: '',
      },
      member: {
        memberId: '5',
        profile: '',
        name: '최번개',
      },
      likeCount: 142,
    },
    {
      category: {
        categoryId: '6',
        memberId: '6',
        title: '1914 translation by H. Rackham',
        thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/6fa3c29b-88c0-4482-aa09-1e3c6804de78',
        shared: true,
        createdAt: '',
      },
      member: {
        memberId: '6',
        profile: '',
        name: 'name',
      },
      likeCount: 14,
    },
  ],
  pageSize: 6,
  hasNext: null,
};

export const MOCK_QUIZ_SIMULATION_INFO_LIST: QuizSimulationStateResponse[] = [
  {
    score: 25.0,
    count: 1,
  },
  {
    score: 100.0,
    count: 4,
  },
  {
    score: 0,
    count: 4,
  },
  {
    score: 12.5,
    count: 4,
  },
];
