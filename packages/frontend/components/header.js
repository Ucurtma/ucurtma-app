import Link from 'next/link';
import styled from '@emotion/styled';
import { Icon, Flex } from '@chakra-ui/core';
import Container from './ui/container';

const Logo = styled(Icon)`
  height: auto;
`;

function Header() {
  return (
    <Container mt={4} color="white">
      <Flex justify="space-between" align="center">
        <Link href="/">
          <a id="logo">
            <Logo name="logo" size="11rem" />
          </a>
        </Link>
      </Flex>
    </Container>
  );
}

export default Header;
