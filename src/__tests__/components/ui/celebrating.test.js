/* eslint-env jest */
import React from 'react';
import { render } from '../../../utils/test-utils';
import Celebrating from '../../../components/ui/celebrating';

describe('Celebrating Tests', () => {
  test('Should render illustration', () => {
    const { getByTestId } = render(<Celebrating />);
    expect(getByTestId('celebrating-svg')).toBeInTheDocument();
  });
});
