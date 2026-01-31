import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver for Framer Motion / Reveal
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
window.ResizeObserver = global.ResizeObserver;
window.IntersectionObserver = global.IntersectionObserver;

// Mock WAAPI
Element.prototype.animate = vi.fn().mockImplementation(() => ({
  finished: Promise.resolve(),
  cancel: vi.fn(),
  play: vi.fn(),
  pause: vi.fn(),
  reverse: vi.fn(),
}));
window.scrollTo = vi.fn();

// Helper to strip motion props
const validProps = (props) => {
  const { layout, initial, animate, transition, whileInView, viewport, variants, ...valid } = props;
  return valid;
};

// Mock Framer Motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => React.createElement('div', validProps(props), children),
      span: ({ children, ...props }) => React.createElement('span', validProps(props), children),
      // Add other HTML elements as needed
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, {}, children),
  };
});