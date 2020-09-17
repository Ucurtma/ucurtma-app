import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Tests', () => {
  test('renders loading', () => {
    render(<App />);
    const loadingEl = screen.getByText(/Loading.../i);
    expect(loadingEl).toBeInTheDocument();
  });
});
