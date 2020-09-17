import React from 'react';
import Manager from '../../../components/view/manager';
import { render, screen, waitFor } from '../../../utils/test-utils';

describe('Manager Tests', () => {
  test('Manager page should be rendered', () => {
    render(<Manager />);

    // we're waiting because our router should navigate us to create-campaign
    waitFor(() => {
      expect(screen.getByTestId('manager-main')).toBeInTheDocument();
    });
  });
});
