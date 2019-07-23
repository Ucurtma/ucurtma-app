/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import Paragraph from '../../../components/ui/paragraph';

describe('Paragraph Tests', () => {
  test('Shows Content', () => {
    const content =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae obcaecati ab dolorum nesciunt iusto saepe aut assumenda dolore architecto nulla numquam dolorem adipisci maxime magnam unde, fuga blanditiis minima mollitia.';
    const { getByText } = render(<Paragraph>{content}</Paragraph>);
    expect(getByText(content)).toBeInTheDocument();
  });

  test('Renders different variants', () => {
    const types = [
      { variant: 'xs', class: 'text-base leading-normal' },
      { variant: 'normal', class: 'text-lg leading-relaxed' },
      { variant: 'lg', class: 'text-xl leading-loose' },
    ];
    types.forEach(type => {
      const { container } = render(
        <Paragraph variant={type.variant}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          obcaecati ab dolorum nesciunt iusto saepe aut assumenda dolore
          architecto nulla numquam dolorem adipisci maxime magnam unde, fuga
          blanditiis minima mollitia.
        </Paragraph>
      );
      expect(container.firstChild).toHaveClass(type.class);
    });
  });
});
