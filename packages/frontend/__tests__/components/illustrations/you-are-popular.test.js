/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import YouArePopular from '../../../components/illustrations/you-are-popular';

describe('Input Tests', () => {
  test('Should render illustration', () => {
    const { getByTestId } = render(<YouArePopular />);
    expect(getByTestId('you-are-popular-svg')).toBeInTheDocument();
  });
});
