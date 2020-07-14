/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '../../../utils/test-utils';
import Topbar from '../../../components/ui/topbar';

describe('Topbar Tests', () => {
  test('Component Should Render', () => {
    const { queryByTestId } = render(
      <Topbar messageKey="donateAll" redirectLink="/campaign/donate-all" />
    );

    expect(queryByTestId('topbar-alert')).toBeInTheDocument();
  });

  test('Trans component should not rendered if messageKey is not provided', () => {
    const { queryByTestId } = render(
      <Topbar redirectLink="/campaign/donate-all" />
    );

    expect(queryByTestId('topbar-alert')).toBeInTheDocument();
    expect(queryByTestId('topbar-message')).not.toBeInTheDocument();
  });

  test('Component should be returned null if user clicks close button', () => {
    const { queryByTestId, getByTestId } = render(
      <Topbar messageKey="donateAll" redirectLink="/campaign/donate-all" />
    );
    const closeButton = getByTestId('topbar-close-button');
    const alert = queryByTestId('topbar-alert');

    expect(alert).toBeInTheDocument();

    fireEvent.click(closeButton);

    waitFor(() => {});

    expect(alert).not.toBeInTheDocument();
  });
});
