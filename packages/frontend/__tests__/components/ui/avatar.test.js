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

  test('Renders different variants', () => {
    const types = [
      { variant: 'xs', class: 'w-8 h-8' },
      { variant: 'normal', class: 'w-11 h-11' },
      { variant: 'lg', class: 'w-14 h-14' },
    ];
    types.forEach(type => {
      const { container } = render(
        <Avatar imagePath={imagePath} variant={type.variant} />
      );
      expect(container.firstChild).toHaveClass(type.class);
    });
  });
});
