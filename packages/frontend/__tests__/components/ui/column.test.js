/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import Column from '../../../components/ui/column';

describe('Column Tests', () => {
  test('Renders Column', () => {
    const { getByText } = render(<Column>Click Me!</Column>);
    expect(getByText('Click Me!')).toBeInTheDocument();
  });

  test('Column has defined column size', () => {
    const { container } = render(<Column colSize="50">Click Me!</Column>);
    const elClass = container.firstChild.className;
    const MyHeaderRoots = document.getElementsByClassName(elClass);
    const style = window.getComputedStyle(MyHeaderRoots[0]);
    expect(style.flexBasis).toBe('50%');
    expect(style.flex).toBe('0 0 50%');
    expect(style.maxWidth).toBe('50%');
  });
});
