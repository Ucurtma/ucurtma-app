/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import Header from '../../../components/ui/header';

describe('Header Tests', () => {
  test('Renders Header', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#logo')).not.toBeNull();
  });

  test('Renders nothing related with menu item if showNav is not provided', () => {
    const { queryByText } = render(<Header showNav={false} />);
    expect(queryByText('Explore')).toBeNull();
  });

  test('Show Navigation if showNav prop is provided', () => {
    const { queryByText } = render(<Header showNav />);
    expect(queryByText('Explore')).toBeInTheDocument();
  });

  test('Show User Avatar if User is logged in', () => {
    const { queryByTestId, queryByText } = render(<Header showNav loggedIn />);
    expect(queryByTestId('avatar')).toBeInTheDocument();
    expect(queryByText('Log in')).not.toBeInTheDocument();
  });
});
