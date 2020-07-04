/* eslint-env jest */
import React from 'react';
import langTR from '../../../../intl/tr-TR.json';
import { render, fireEvent } from '../../../../utils/test-utils';
import SplashScreen from '../../../../components/view/landing-page/splash-screen';

describe('Splash Screen tests', () => {
  test('Splash Screen should be rendered', () => {
    const { container } = render(<SplashScreen />);
    const background = container.querySelector('#splash-screen');
    expect(background).toBeInTheDocument();
  });

  test('Application modal should open when user click "apply" button', () => {
    const { getByText, getByRole } = render(<SplashScreen />);
    const buttonText = getByText(langTR.splashScreen['Apply as a student']);
    fireEvent.click(buttonText);

    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  test('Subscribe modal should open when user click "subscribe" link', () => {
    const { getByRole, getByTestId } = render(<SplashScreen />);
    const buttonText = getByTestId('shortlist');
    fireEvent.click(buttonText);

    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
