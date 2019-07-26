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

  test('Renders small variant', () => {
    const { container } = render(
      <Paragraph variant="xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        obcaecati ab dolorum nesciunt iusto saepe aut assumenda dolore
        architecto nulla numquam dolorem adipisci maxime magnam unde, fuga
        blanditiis minima mollitia.
      </Paragraph>
    );
    expect(container.firstChild).toHaveClass('text-base leading-normal');
  });

  test('Renders normal variant', () => {
    const { container } = render(
      <Paragraph variant="normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        obcaecati ab dolorum nesciunt iusto saepe aut assumenda dolore
        architecto nulla numquam dolorem adipisci maxime magnam unde, fuga
        blanditiis minima mollitia.
      </Paragraph>
    );
    expect(container.firstChild).toHaveClass('text-lg leading-relaxed');
  });

  test('Renders large variant', () => {
    const { container } = render(
      <Paragraph variant="lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        obcaecati ab dolorum nesciunt iusto saepe aut assumenda dolore
        architecto nulla numquam dolorem adipisci maxime magnam unde, fuga
        blanditiis minima mollitia.
      </Paragraph>
    );
    expect(container.firstChild).toHaveClass('text-xl leading-loose');
  });
});
