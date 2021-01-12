import { keyframes } from '@emotion/react';

const leftToRight = keyframes`
  0% {
    clip-path: polygon(0 0, 0% 0%, 0% 100%, 0% 100%);
  }

  50% {
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  }

  100% {
    clip-path: polygon(0 0, 48% 0%, 48% 100%, 0% 100%);
  }
`;

export default leftToRight;
