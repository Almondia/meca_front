/* eslint-disable import/prefer-default-export */
export const extractTextFromHTML = (htmlString: string) =>
  htmlString
    .replace(/<img[^>]*>/gi, '[이미지]')
    .replace(/<[^>]*>?/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .trim();
