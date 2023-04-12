export const CATEGORIES = [...Array(100)].map((v, i) => {
  const obj = {};
  obj.categoryId = 'cid' + i;
  obj.title = 'title' + i;
  obj.createdAt = i;
  obj.thumbnail = '';
  obj.shared = true;
  return obj;
});

export const MOCK_CATEGORY_ID = 'cid24';

export const MECAS = [...Array(24)].map((v, i) => {
  const obj = {};
  obj.categoryId = MOCK_CATEGORY_ID;
  obj.cardId = 'cid' + i;
  obj.title = 'title' + i;
  obj.cardType = 'KEYWORD';
  obj.answer = 'answer' + i;
  obj.question = 'question' + i;
  return obj;
});
