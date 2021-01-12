/* logic source: https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react */
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { ChevronsRight, ChevronsLeft } from 'react-feather';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const ranges = [];

  while (i <= to) {
    ranges.push(i);
    i += step;
  }

  return ranges;
};

function Pagination({
  totalRecords = 0, // indicates the total number of records to be paginated
  pageLimit = 30, // indicates the number of records to be shown per page
  pageNeighbours = 1, // indicates the number of additional page numbers to show on each side of the current page.
  onPageChanged = f => f, // is a function that will be called with data of the curent pagination state only when the current page changes
  wrapperProps,
  shouldResetPagination,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const defPageNeighbours =
    typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const goToPage = useCallback((page, onMount) => {
    const currentPageMath = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage: currentPageMath,
      totalPages,
      pageLimit,
      totalRecords,
    };
    setCurrentPage(currentPageMath);
    if (!onMount) {
      onPageChanged(paginationData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    goToPage(1, true);
  }, [goToPage]);

  useEffect(() => {
    if (shouldResetPagination) {
      goToPage(1, true);
    }
  }, [goToPage, shouldResetPagination]);

  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = defPageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const handleClick = page => evt => {
    evt.preventDefault();
    goToPage(page);
  };

  const handleMoveLeft = evt => {
    evt.preventDefault();
    goToPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    goToPage(currentPage + pageNeighbours * 2 + 1);
  };

  if (!totalRecords || totalPages === 1) return null;

  return (
    <Box
      as="nav"
      display="flex"
      listStyleType="none"
      justifyContent="center"
      aria-label="Pagination"
      data-testid="pagination"
      {...wrapperProps}
    >
      {fetchPageNumbers().map((page, index) => {
        const buttonProps = {
          boxShadow: '0 0 2px rgba(45,55,72,0.2)',
          mr: 2,
          colorScheme: currentPage === page ? 'blue' : 'gray',
          cursor: 'pointer',
        };

        if (page === LEFT_PAGE)
          return (
            <Button
              aria-label="Previous"
              onClick={e => handleMoveLeft(e)}
              key={index.toString()}
              {...buttonProps}
            >
              <Box as={ChevronsLeft} />
            </Button>
          );

        if (page === RIGHT_PAGE)
          return (
            <Button
              aria-label="Next"
              onClick={e => handleMoveRight(e)}
              key={index.toString()}
              {...buttonProps}
            >
              <Box as={ChevronsRight} />
            </Button>
          );

        return (
          <Button
            onClick={e => handleClick(page)(e)}
            key={index.toString()}
            isActive={currentPage === page}
            isDisabled={currentPage === page}
            _disabled={{ bg: 'blue' }}
            {...buttonProps}
          >
            {page}
          </Button>
        );
      })}
    </Box>
  );
}

export default Pagination;
