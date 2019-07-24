/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import Card from '../../../components/ui/card';
import CampaignIcon from '../../../icons/campaign-icon';

describe('Card Tests', () => {
  test('Renders Card Component', () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass(
      'bg-card-bg shadow rounded-2 min-h-25 min-w-190'
    );
  });

  test('Renders Card Title', () => {
    const { container } = render(
      <Card icon={CampaignIcon} title="Create Campaign" />
    );
    const content = container.firstChild.firstChild;
    const title = container.querySelector('h2');
    const icon = container.querySelector('svg');
    expect(content).toHaveClass('flex items-end');
    expect(title.innerHTML).toBe('Create Campaign');
    expect(icon).toBeInTheDocument();
  });

  test('Shows Content', () => {
    const content =
      'Our team invented awesome campaign creator for you. Give us some details about you and your campaign. But this should little longer.';
    const { getByText } = render(<Card>{content}</Card>);
    expect(getByText(content)).toBeInTheDocument();
  });

  test('Renders button without paddings', () => {
    const { container } = render(
      <Card noPadding>
        Our team invented awesome campaign creator for you. Give us some details
        about you and your campaign. But this should little longer
      </Card>
    );
    expect(container.firstChild).toHaveClass('px-0 py-0');
    expect(container.firstChild).not.toHaveClass('px-6 py-10');
  });
});
