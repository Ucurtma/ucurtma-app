/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import WaitingForYou from '../../../components/illustrations/waiting-for-you';

describe('Input Tests', () => {
  test('Should render illustration', () => {
    const { getByTestId } = render(<WaitingForYou />);
    expect(getByTestId('waiting-for-you-svg')).toBeInTheDocument();
  });
});
