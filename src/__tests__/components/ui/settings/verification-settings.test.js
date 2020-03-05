/* eslint-env jest */
import React from 'react';
import { render } from '../../../../utils/test-utils';
import VerificationSettings from '../../../../components/ui/settings/verification-settings';

describe('Verification Settings Tests', () => {
  test('Renders Component', () => {
    const { getByText } = render(<VerificationSettings />);
    expect(getByText('Verification')).toBeInTheDocument();
  });

  test('Should render Verificated User if isVerified true', () => {
    const { getByText } = render(<VerificationSettings isVerified />);
    expect(getByText('Verificated User')).toBeInTheDocument();
  });

  test('Should render apply button if isVerified false', () => {
    const { getByText } = render(<VerificationSettings isVerified={false} />);
    expect(getByText('Apply')).toBeInTheDocument();
  });
});
