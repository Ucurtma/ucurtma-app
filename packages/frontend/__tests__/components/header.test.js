/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import Header from '../../components/header';

describe('Header Tests', () => {
  test('Renders Header', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#logo')).not.toBeNull();
  });
});
