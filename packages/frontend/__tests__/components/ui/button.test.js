/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../../components/ui/button';

describe('Button Tests', () => {
  test('Shows Content', () => {
    const buttonText = 'Click Here';
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText(buttonText)).not.toBeNull();
  });

  test('Has default classes', () => {
    const { container } = render(<Button>Click Here</Button>);
    expect(container.firstChild).toHaveClass(
      'ui-button font-bold text-sm sm:text-base rounded-full'
    );
  });

  test('Renders outlined variant', () => {
    const { container } = render(
      <Button variant="outlined">Click Here</Button>
    );
    expect(container.firstChild).toHaveClass(
      'text-default-button border-2 border-solid'
    );
  });

  test('Renders flat variant', () => {
    const { container } = render(<Button variant="flat">Click Here</Button>);
    expect(container.firstChild).toHaveClass(
      'button-flat p-0 m-0 text-navbar-link'
    );
  });

  test('Renders backgrounded variant', () => {
    const { container } = render(<Button variant="bg">Click Here</Button>);
    expect(container.firstChild).toHaveClass(
      'bg-default-button text-navbar-link'
    );
  });

  test('Renders button without paddings', () => {
    const { container } = render(<Button noPadding>Click Here</Button>);
    expect(container.firstChild).toHaveClass('py-0 sm:py-0 px-0');
    expect(container.firstChild).not.toHaveClass('py-2 sm:py-3 px-6');
  });

  test('Runs action on click', () => {
    const handleCountChange = jest.fn();
    const { getByText } = render(
      <Button onClick={handleCountChange}>Click Here</Button>
    );
    fireEvent.click(getByText('Click Here'));
    expect(handleCountChange).toHaveBeenCalledTimes(1);
  });
});
