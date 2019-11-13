import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: ${props =>
    `0 0 ${props.colSize === 'auto' ? 'auto' : `${props.colSize}%`}`};
  max-width: ${props =>
    `${props.colSize === 'auto' ? 'auto' : `${props.colSize}%`}`};
`;

Column.defaultProps = {
  colSize: 'auto',
};

Column.propTypes = {
  colSize: PropTypes.string,
};

export default Column;
