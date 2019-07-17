/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
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
});
