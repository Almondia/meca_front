import hljs from 'highlight.js/lib/core';

// TODO: 동적으로 import 못하나
async function initHighlight() {
  await Promise.all([
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/typescript');
      hljs.registerLanguage('typescript', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/xml');
      hljs.registerLanguage('xml', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/cpp');
      hljs.registerLanguage('cpp', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/java');
      hljs.registerLanguage('java', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/css');
      hljs.registerLanguage('css', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/python');
      hljs.registerLanguage('python', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/sql');
      hljs.registerLanguage('sql', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/bash');
      hljs.registerLanguage('bash', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/yaml');
      hljs.registerLanguage('yaml', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/json');
      hljs.registerLanguage('json', langFn);
    })(),
    (async () => {
      const { default: langFn } = await import('highlight.js/lib/languages/shell');
      hljs.registerLanguage('shell', langFn);
    })(),
  ]);
  return hljs;
}

export default initHighlight;
