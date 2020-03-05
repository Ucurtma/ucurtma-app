/* eslint-env jest */
import React from 'react';
import { Facebook } from 'react-feather';
import userEvent from '@testing-library/user-event';
import { render } from '../../../utils/test-utils';
import SocialLink from '../../../components/ui/social-link';

describe('Social Link Tests', () => {
  test('Renders Social Link Item and Shows Label', () => {
    const { getByText } = render(
      <SocialLink icon={Facebook} label="Facebook" />
    );
    expect(getByText('Facebook')).toBeInTheDocument();
  });

  test('Should run defined function on Action', () => {
    const func = jest.fn();
    const { getByText } = render(
      <SocialLink icon={Facebook} label="Facebook" onAction={func} />
    );
    const element = getByText('Connect');
    userEvent.click(element);
    expect(func).toHaveBeenCalled();
  });

  test('Should show Disconnect if account is connected', () => {
    const { getByText } = render(
      <SocialLink icon={Facebook} label="Facebook" isConnected />
    );
    const element = getByText('Disconnect');
    expect(element).toBeInTheDocument();
  });
});
