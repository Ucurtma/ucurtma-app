/* eslint-env jest */
import React from 'react';
import { Bell } from 'react-feather';
import { render } from '../../../utils/test-utils';
import NavButton from '../../../components/ui/nav-icon-button';

describe('Navigation Icon Button Tests', () => {
  test('Renders Button Badge', () => {
    const { getByText } = render(
      <NavButton label="Notifications" icon={Bell} badge={1} />
    );
    expect(getByText('1')).toBeInTheDocument();
  });
});
