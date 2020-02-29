/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import Dropbox from '../../../components/ui/dropbox';

describe('Dropbox Tests', () => {
  test('Shuld render Dropbox', () => {
    const { getByText } = render(<Dropbox type="Driving Licence" />);
    expect(getByText('Driving Licence')).toBeInTheDocument();
  });

  test('Should render Icon', () => {
    const { container } = render(
      <Dropbox type="Driving Licence" icon="drivingLicence" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
