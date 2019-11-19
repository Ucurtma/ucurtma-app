/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import Header from '../../components/header';

describe('Header Tests', () => {
  test('Renders Header', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#logo')).not.toBeNull();
  });

  test('Show Navigation if showNav prop is provided', () => {
    const { getByText } = render(<Header showNav />);
    expect(getByText('Explore')).toBeInTheDocument();
  });

  test('Show User Avatar if User is logged in', () => {
    const { getByTestId, queryByText } = render(<Header showNav loggedIn />);
    expect(getByTestId('avatar')).toBeInTheDocument();
    expect(queryByText('Log in')).not.toBeInTheDocument();
  });
});
