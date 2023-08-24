/* istanbul ignore file */
function setTheme() {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === '"light"' || currentTheme === '"dark"') {
    document.documentElement.dataset.theme = currentTheme.replaceAll('"', '');
    return;
  }
  const preferTheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (preferTheme) {
    document.documentElement.dataset.theme = currentTheme;
    return;
  }
  document.documentElement.dataset.theme = 'light';
}

const ThemeScript = () => {
  const stringifiedFunction = String(setTheme);
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: `(${stringifiedFunction})()` }} />;
};

export default ThemeScript;
