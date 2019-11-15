/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import SocialLinkSettings from '../../../../components/ui/settings/social-links';

describe('Social Links Tests', () => {
  test('Renders Component', () => {
    const { getByText } = render(<SocialLinkSettings />);
    expect(getByText('Social Links')).toBeInTheDocument();
    expect(
      getByText('Display your social media links on your profile')
    ).toBeInTheDocument();
  });
});
