/* eslint-env jest */
import React from 'react';
import { render } from '../../../../utils/test-utils';
import SplashScreen from '../../../../components/view/landing-page/splash-screen';

describe('Splash Screen tests', () => {
  test('Splash Screen should be rendered', () => {
    const { container } = render(<SplashScreen />);
  });
});
