/* eslint-env jest */
import React from 'react';
import { render } from '../../../../utils/test-utils';
import LandingPage from '../../../../components/view/landing-page/landing-page';

describe('Landing Page tests', () => {
  test('Landing page should render all of the components', () => {
    const { container } = render(<LandingPage />);
    const splashScreen = container.querySelector('#splash-screen');
    const problemAndSolution = container.querySelector('#problem-solution');
    const howItWorks = container.querySelector('#how-it-works');
    const featuredCampaigns = container.querySelector('#featured-campaigns');
    const faq = container.querySelector('#faq');

    expect(splashScreen).toBeInTheDocument();
    expect(problemAndSolution).toBeInTheDocument();
    expect(howItWorks).toBeInTheDocument();
    expect(featuredCampaigns).toBeInTheDocument();
    expect(faq).toBeInTheDocument();
  });
});
