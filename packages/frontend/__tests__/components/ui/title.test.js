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

  test('Renders small variant', () => {
    const { container } = render(<Title variant="xs">I am legend</Title>);
    expect(container.firstChild).toHaveClass('text-2xl');
  });

  test('Renders normal variant', () => {
    const { container } = render(<Title variant="normal">I am legend</Title>);
    expect(container.firstChild).toHaveClass('text-3xl');
  });
});
