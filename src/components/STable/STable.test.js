import React from 'react';
import {
  render, act, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import STable from './STable';

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

test('Upcoming events table data', async () => {
  const promise = Promise.resolve();
  axiosMock.get.mockResolvedValueOnce({
    data: { events: [{ name: 'Football', id: 1 }] },
  });
  const url = '__URL__REMOVED__';
  const { getByText } = render(
    <STable
      url={url}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
      ]}
    />,
  );
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toBeCalledWith(url);
  await waitFor(() => getByText('Football'));
  expect(getByText('Football')).toBeInTheDocument();
  await act(() => promise);
});
