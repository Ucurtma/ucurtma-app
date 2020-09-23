import React from 'react';
import Manager from '../../../components/view/manager';
import { render, screen, waitFor } from '../../../utils/test-utils';
import langEN from '../../../intl/en-US.json';

describe('Manager Tests', () => {
  // simple mde is using createRange function.
  // we should mock it since jestdom doesn't support createRange.

  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    getBoundingClientRect: () => ({}),
    getClientRects: () => ({}),
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  test('Manager page should be rendered', () => {
    render(<Manager />);

    // we're waiting because our router should navigate us to create-campaign
    waitFor(() => {
      expect(screen.getByTestId('manager-main')).toBeInTheDocument();
    });
  });

  test('Page list should rendered in page.', () => {
    render(<Manager />);
    const menuItems = [
      langEN.manager.CampaignsActions,
      langEN.manager.PostContent.title,
    ];

    menuItems.forEach(menuItem => {
      expect(screen.getByText(menuItem)).toBeInTheDocument();
    });
  });
});
