/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import MyPassword from '../../../components/illustrations/my-password';

describe('Input Tests', () => {
  test('Should render illustration', () => {
    const { getByTestId } = render(<MyPassword />);
    expect(getByTestId('my-password-svg')).toBeInTheDocument();
  });
});
