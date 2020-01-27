/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import { Facebook } from 'react-feather';
import userEvent from '@testing-library/user-event';
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
