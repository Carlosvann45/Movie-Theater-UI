import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LoadingSpinner from './LoadingSpinner';

jest.doMock('./LoadingSpinner', () => ({
  ...jest.requireActual('react-promise-tracking')
}));
const container = document.createElement('div');
describe('Loading spinner test', () => {
  it('renders loading spinner', async () => {
    act(() => {
      render(<LoadingSpinner />, container);
    });
  });
});
