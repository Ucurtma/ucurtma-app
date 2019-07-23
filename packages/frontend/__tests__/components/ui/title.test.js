/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import Title from '../../../components/ui/title';

describe('Title Tests', () => {
  test('Shows Content', () => {
    const content = 'I am legend';
    const { getByText } = render(<Title>{content}</Title>);
    expect(getByText(content)).toBeInTheDocument();
  });

  test('Renders different variants', () => {
    const types = [
      { variant: 'normal', class: 'text-3xl' },
      { variant: 'xs', class: 'text-2xl' },
    ];
    types.forEach(type => {
      const { container } = render(
        <Title variant={type.variant}>I am legend</Title>
      );
      expect(container.firstChild).toHaveClass(type.class);
    });
  });
});
