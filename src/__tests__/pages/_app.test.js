/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import MyApp from '../../pages/_app';
import Login from '../../pages/account/login';

describe('App Tests', () => {
  test('Renders Component', () => {
    const { getByText } = render(<MyApp Component={Login} />);
    expect(getByText('Sign up.')).toBeInTheDocument();
  });
});
