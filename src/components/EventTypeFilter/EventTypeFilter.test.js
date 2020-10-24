import React from 'react';
import {
  render,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventTypeFilter from './EventTypeFilter';

test('Upcoming events select filter', async () => {
  const promise = Promise.resolve();

  const onChange = jest.fn(() => promise);
  const { getByTestId, getByText } = render(
    <EventTypeFilter onChange={onChange} />,
  );

  const select = getByTestId('types-select').firstElementChild;
  fireEvent.mouseDown(select);
  expect(getByText('American football match')).toBeInTheDocument();
  fireEvent.click(getByText('American football match'));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('american_football_match', {
    children: 'American football match',
    key: 'american_football_match',
    value: 'american_football_match',
  });
  await act(() => promise);
});
