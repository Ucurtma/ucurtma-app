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

  test('Renders different variants', () => {
    const types = [
      {
        variant: 'outlined',
        class: 'text-default-button border-2 border-solid',
      },
      { variant: 'flat', class: 'button-flat p-0 m-0 text-navbar-link' },
      { variant: 'bg', class: 'bg-default-button text-navbar-link' },
    ];
    types.forEach(type => {
      const { container } = render(
        <Button variant={type.variant}>Click Here</Button>
      );
      expect(container.firstChild).toHaveClass(type.class);
    });
  });

  test('Renders button without paddings', () => {
    const { container } = render(<Button noPadding>Click Here</Button>);
    expect(container.firstChild).toHaveClass('py-0 sm:py-0 px-0');
    expect(container.firstChild).not.toHaveClass('py-2 sm:py-3 px-6');
  });

  test('Runs action on click', () => {
    let counter = 0;
    const { getByText } = render(
      <Button
        onClick={() => {
          counter += 1;
        }}
      >
        Click Here
      </Button>
    );
    const isClickDone = fireEvent.click(getByText('Click Here'));
    expect(counter).toBe(1);
    expect(isClickDone).toBe(true);
  });
});
