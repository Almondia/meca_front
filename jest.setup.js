// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './__tests__/__mocks__/msw/server';
import { MOCK_MEMBER_ID } from './__tests__/__mocks__/msw/data';

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
  const MockedQuillWriter = ({ contents, setContents, placeholder }) => (
    <div>
      <input type="text" value={contents} placeholder={placeholder} onChange={(e) => setContents(e.target.value)} />
    </div>
  );
  return MockedQuillWriter;
});

jest.mock('./components/molcules/Editor/QuillNoSSRReader', () => {
  const MockedQuillReader = ({ content }) => <div dangerouslySetInnerHTML={{ __html: content }} />;
  return MockedQuillReader;
});

jest.mock('./utils/jwtHandler', () => ({
  getJWTPayload: (token, key) => (token && key === 'id' ? MOCK_MEMBER_ID : undefined),
}));

jest.mock('./utils/jwtHandler', () => ({
  getJWTPayload: (token, key) => (token && key === 'id' ? MOCK_MEMBER_ID : undefined),
}));

// IMPORTANT First mock winston
jest.mock('winston', () => ({
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
    errors: jest.fn(),
    splat: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
  }),
  transports: {
    File: jest.fn(),
    DailyRotateFile: jest.fn(),
  },
}));

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

if (typeof window !== 'undefined') {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
}
