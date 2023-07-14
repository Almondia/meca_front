// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './__tests__/__mocks__/msw/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

jest.mock('./components/common/Icon', () => {
  const MockedIcon = ({ icon }) => <div>{icon}</div>;
  return MockedIcon;
});

// TODO: mocking 없이 동작하도록 개선 시도해볼 것
jest.mock('./components/molcules/Editor/QuillWriter', () => {
  const MockedQuillWriter = ({ contents, setContents, ariaLabel }) => (
    <div>
      <input type="text" value={contents} aria-label={ariaLabel} onChange={(e) => setContents(e.target.value)} />
    </div>
  );
  return MockedQuillWriter;
});

jest.mock('./components/molcules/Editor/QuillNoSSRReader', () => {
  const MockedQuillReader = ({ content }) => <div dangerouslySetInnerHTML={{ __html: content }} />;
  return MockedQuillReader;
});

if (typeof window !== 'undefined') {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
}

if (typeof window !== 'undefined') {
  window.document.execCommand = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
}
