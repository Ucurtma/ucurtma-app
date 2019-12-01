/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import VerificationSuccess from '../../../components/ui/verification-success';

describe('Verification Success Tests', () => {
  test('Shuld render Verification Success', () => {
    const { getByText, container } = render(<VerificationSuccess />);
    expect(getByText('Thank you for application!')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
