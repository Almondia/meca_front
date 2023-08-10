/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export const extractTextFromHTML = (htmlString: string) => {
  let imageIndex = 0;
  let codeIndex = 0;
  return htmlString
    .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, () => `[코드-${++codeIndex}]`)
    .replace(/<img[^>]*>/gi, () => `[이미지-${++imageIndex}]`)
    .replace(/<[^>]*>?/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .trim();
};
