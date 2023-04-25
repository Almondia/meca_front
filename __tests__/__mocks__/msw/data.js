export const CATEGORIES = [...Array(100)].map((v, i) => {
  const obj = {};
  obj.categoryId = '01234567-89ab-cdef-0123-456789abcd' + i.toString().padStart(2, '0');
  obj.title = 'title' + i;
  obj.createdAt = i;
  obj.thumbnail = '';
  obj.shared = true;
  return obj;
});

export const MOCK_CATEGORY_ID = '01234567-89ab-cdef-0123-456789abcd24';
export const MOCK_MEMBERI_ID = '01234567-89ab-cdef-0123-456789abcdef';

export const MECAS = [...Array(24)].map((v, i) => {
  const obj = {};
  obj.categoryId = MOCK_CATEGORY_ID;
  obj.cardId = '01234567-89ab-cdef-0123-456789abcd' + i.toString().padStart(2, '0');
  obj.title = 'title' + i;
  obj.cardType = 'KEYWORD';
  obj.answer = 'answer' + i;
  obj.question = 'question' + i;
  return obj;
});

export const ME = {
  memberId: '01234567-89ab-cdef-0123-456789abcdef',
  name: 'pds0309',
  email: 'abc@abc.com',
  role: 'USER',
  oauthType: 'KAKAO',
  createdAt: '2023-03-11T12:56:22.954816',
};
