/* eslint-env jest */
import React from 'react';
import { render } from '../../../utils/test-utils';
import WaitingForYou from '../../../components/illustrations/waiting-for-you';

describe('Waiting for You Illustration Tests', () => {
  test('Should render illustration', () => {
    const { getByTestId } = render(<WaitingForYou />);
    expect(getByTestId('waiting-for-you-svg')).toBeInTheDocument();
  });
});
