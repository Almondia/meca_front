const CATEGORIES = [...Array(100)].map((v, i) => {
  const obj = {};
  obj.categoryId = 'cid' + i;
  obj.title = 'title' + i;
  return obj;
});

export default CATEGORIES;
