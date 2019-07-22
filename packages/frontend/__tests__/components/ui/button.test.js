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
    const wrapper = render(<Button>Click Here</Button>);
    expect(wrapper.container.firstChild.classList.contains('ui-button')).toBe(
      true
    );
  });

  test('Renders different variants', () => {
    const types = [
      { variant: 'outlined', class: 'text-default-button' },
      { variant: 'flat', class: 'button-flat' },
      { variant: 'bg', class: 'bg-default-button' },
    ];
    types.forEach(type => {
      const wrapper = render(
        <Button variant={type.variant}>Click Here</Button>
      );
      expect(wrapper.container.firstChild.classList.contains(type.class)).toBe(
        true
      );
    });
  });

  test('Renders button without paddings', () => {
    const wrapper = render(<Button noPadding>Click Here</Button>);
    expect(wrapper.container.firstChild.classList.contains('py-0')).toBe(true);
    expect(wrapper.container.firstChild.classList.contains('sm:py-0')).toBe(
      true
    );
    expect(wrapper.container.firstChild.classList.contains('px-0')).toBe(true);
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
