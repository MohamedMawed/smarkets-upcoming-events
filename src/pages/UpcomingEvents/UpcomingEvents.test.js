import React from 'react';
import {
  render, act, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import UpcomingEvents from './UpcomingEvents';
import { baseUrl } from '../../constants/appConstants';

beforeEach(() => {
  cleanup();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('Upcoming events listing', async () => {
  const promise = Promise.resolve();
  const url = `${baseUrl}v3/events/?state=upcoming`;

  axiosMock.get.mockImplementation((requestUrl) => {
    switch (requestUrl) {
      case url:
        return Promise.resolve({
          data: { events: [{ name: 'Football', id: 1 }] },
        });
      default:
        return Promise.resolve({
          data: { events: [{ name: 'basket ball', id: 3 }] },
        });
    }
  });
  const { getByText, getByTestId } = render(
    <UpcomingEvents />,
  );
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toBeCalledWith(url);
  await waitFor(() => getByText('Football'));
  expect(getByText('Football')).toBeInTheDocument();
  const select = getByTestId('types-select').firstElementChild;
  fireEvent.focusIn(select);
  fireEvent.mouseDown(select);
  fireEvent.click(screen.getByText('American football match').parentElement);

  await waitFor(() => getByText('basket ball'));
  expect(getByText('basket ball')).toBeInTheDocument();
  await act(() => promise);
});
