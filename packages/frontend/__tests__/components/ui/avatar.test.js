/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../../../components/ui/avatar';

describe('Avatar Tests', () => {
  const imagePath = 'imageUrl';
  test('Renders with default classes', () => {
    const { container } = render(<Avatar imagePath={imagePath} />);
    const defaultClasses =
      'flex align-center justify-center overflow-hidden rounded-full';
    expect(container.firstChild).toHaveClass(defaultClasses);
  });

  test('Renders right image', () => {
    const { container } = render(<Avatar imagePath={imagePath} />);
    const content = container.firstChild.firstChild;
    expect(content).toHaveStyle(`background-image: url('${imagePath}'')`);
  });

  test('Renders empty circle if there is no imagePath', () => {
    const { container } = render(<Avatar />);
    const content = container.firstChild.firstChild;
    const emptyCircleClasses = 'w-full h-full bg-text-color';
    expect(content).toHaveClass(emptyCircleClasses);
    expect(content).not.toHaveClass('w-11');
  });

  test('Renders small variant', () => {
    const { container } = render(<Avatar imagePath={imagePath} variant="xs" />);
    expect(container.firstChild).toHaveClass('w-8 h-8');
  });

  test('Renders normal variant', () => {
    const { container } = render(
      <Avatar imagePath={imagePath} variant="normal" />
    );
    expect(container.firstChild).toHaveClass('w-11 h-11');
  });

  test('Renders large variant', () => {
    const { container } = render(<Avatar imagePath={imagePath} variant="lg" />);
    expect(container.firstChild).toHaveClass('w-14 h-14');
  });
});
