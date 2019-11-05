import Link from 'next/link';
import styled from '@emotion/styled';
import { Icon, Box, Flex } from '@chakra-ui/core';

const Logo = styled(Icon)`
  height: auto;
`;

function Header() {
  return (
    <Box
      width={{
        base: 'containers.base',
        sm: 'containers.sm',
        md: 'containers.md',
        lg: 'containers.lg',
        xl: 'containers.lg',
      }}
      m="auto"
      mt={4}
      p={4}
      color="white"
    >
      <Flex justify="space-between" align="center">
        <Link href="/">
          <a id="logo">
            <Logo name="logo" size="11rem" />
          </a>
        </Link>
      </Flex>
    </Box>
  );
}

export default Header;
