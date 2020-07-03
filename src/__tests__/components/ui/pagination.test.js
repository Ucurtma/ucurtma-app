/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '../../../utils/test-utils';
import Pagination from '../../../components/ui/pagination';

describe('Pagination Tests', () => {
  test('Pagination should be rendered', () => {
    const { getByText } = render(
      <Pagination totalRecords={30} pageLimit={2} />
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('15')).toBeInTheDocument();
  });

  test('Page Limit and total records should work', () => {
    const { queryByText, getByText } = render(
      <Pagination totalRecords={30} pageLimit={8} />
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(queryByText('5')).toBeNull();
  });

  test('Page 1 should be activated by default', () => {
    const { getByText } = render(
      <Pagination totalRecords={30} pageLimit={2} />
    );

    expect(getByText('1').getAttribute('data-active')).toBeTruthy();
  });

  test('User should change active page on click', () => {
    const { getByText } = render(
      <Pagination totalRecords={30} pageLimit={2} />
    );

    const pageTwo = getByText('2');
    expect(pageTwo.getAttribute('data-active')).toBeFalsy();

    fireEvent.click(pageTwo);
    expect(pageTwo.getAttribute('data-active')).toBeTruthy();
  });

  test('OnPageChanged function should be called when page changed', () => {
    const changePage = jest.fn();
    const { getByText } = render(
      <Pagination
        totalRecords={30}
        pageLimit={2}
        onPageChanged={() => changePage()}
      />
    );

    const pageTwo = getByText('2');
    fireEvent.click(pageTwo);
    expect(changePage).toBeCalled();
  });
});
