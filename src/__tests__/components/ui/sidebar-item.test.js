/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { Bell } from 'react-feather';
import SidebarItem from '../../../components/ui/sidebar-item';

describe('Sidebar Item Tests', () => {
  test('Renders Sidebar Item', () => {
    const { getByText } = render(
      <SidebarItem icon={Bell} label="Sidebar Item" active={false} />
    );
    expect(getByText('Sidebar Item')).toBeInTheDocument();
  });

  test('Runs function onClick', () => {
    const func = jest.fn();
    const { getByText } = render(
      <SidebarItem
        icon={Bell}
        label="Sidebar Item"
        active={false}
        onClick={func()}
      />
    );
    const element = getByText('Sidebar Item');
    userEvent.click(element);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('Should get ActiveProps if active is true', () => {
    const { container } = render(
      <SidebarItem icon={Bell} label="Sidebar Item" active />
    );
    const elClass = container.firstChild.className;
    const element = document.getElementsByClassName(elClass);
    const style = window.getComputedStyle(element[0]);
    expect(style.boxShadow).toBe('-4px 0 #00C2FF');
  });
});
