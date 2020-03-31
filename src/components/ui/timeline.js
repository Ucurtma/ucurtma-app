import React from 'react';
import { Box, PseudoBox, Image } from '@chakra-ui/core';

function Timeline() {
  const timelineRanges = [
    {
      date: new Date(),
      items: [
        {
          type: 'image',
          content: [
            'https://picsum.photos/1080/720',
            'https://picsum.photos/1080/720',
            'https://picsum.photos/1080/720',
          ],
        },
        {
          type: 'video',
          content: 'https://www.youtube.com/watch?v=IwrBfcv0EhE',
        },
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices leo ligula, quis porta libero viverra consectetur. Donec mollis euismod augue',
        },
      ],
    },
    {
      date: new Date(),
      items: [
        {
          type: 'image',
          content: [
            'https://picsum.photos/1080/720',
            'https://picsum.photos/1080/720',
            'https://picsum.photos/1080/720',
          ],
        },
        {
          type: 'video',
          content: 'https://www.youtube.com/watch?v=IwrBfcv0EhE',
        },
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices leo ligula, quis porta libero viverra consectetur. Donec mollis euismod augue',
        },
      ],
    },
    {
      date: new Date(),
      items: [
        {
          type: 'image',
          content: [
            'https://i.picsum.photos/id/853/1080/720.jpg',
            'https://i.picsum.photos/id/853/1080/720.jpg',
            'https://i.picsum.photos/id/853/1080/720.jpg',
          ],
        },
        {
          type: 'video',
          content: 'https://www.youtube.com/watch?v=IwrBfcv0EhE',
        },
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices leo ligula, quis porta libero viverra consectetur. Donec mollis euismod augue',
        },
      ],
    },
  ];

  const listPadding = 5;

  return (
    <Box>
      <PseudoBox as="ul" m={0} listStyleType="none" pos="relative">
        {timelineRanges.map((range, index) => {
          return (
            <PseudoBox
              pl={listPadding}
              as="li"
              pos="relative"
              _before={{
                content: `' '`,
                position: 'absolute',
                left: 'calc(0.75rem / 2)',
                width: '1px',
                height: index === timelineRanges.length - 1 ? '16px' : '200%',
                bg: 'gray.300',
                top: index === 0 && '16px',
              }}
              overflow="hidden"
            >
              <Box mb={4}>
                <Box
                  as="span"
                  position="absolute"
                  width="0.75rem"
                  height="0.75rem"
                  left={0}
                  borderRadius="50%"
                  bg="gray.300"
                  top="0.4rem"
                />
                <PseudoBox display="inline-flex" fontSize="15px">
                  {range.date.toLocaleString()}
                </PseudoBox>
                <Box>
                  {range.items.map(item => {
                    if (item.type === 'image') {
                      return (
                        <>
                          {item.content.map(imageURL => {
                            return <Image src={imageURL} />;
                          })}
                        </>
                      );
                    }
                    return <Box>{item.type}</Box>;
                  })}
                </Box>
              </Box>
            </PseudoBox>
          );
        })}
      </PseudoBox>
    </Box>
  );
}

export default Timeline;
