/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '../../../utils/test-utils';
import Button from '../../../components/ui/button';

describe('Button Tests', () => {
  test('Renders Button', () => {
    const { getByText } = render(<Button>Click Me!</Button>);
    expect(getByText('Click Me!')).toBeInTheDocument();
  });

  test('Runs function on click', () => {
    const clickFunc = jest.fn();
    const { getByText } = render(
      <Button onClick={clickFunc}>Click Me!</Button>
    );
    fireEvent.click(getByText('Click Me!'));
    expect(clickFunc).toHaveBeenCalledTimes(1);
  });
});
