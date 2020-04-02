import React from 'react';
import {
  Box,
  PseudoBox,
  Image,
  Heading,
  AspectRatioBox,
} from '@chakra-ui/core';
import Masonry from 'react-masonry-css';
import './timeline.css';

function TimelineBox({ children, title, ...otherProps }) {
  return (
    <Box
      px={4}
      pt={4}
      mb={4}
      bg="gray.200"
      border="1px solid"
      borderColor="gray.300"
      borderRadius={4}
      {...otherProps}
    >
      <Heading pb={4} size="sm" color="gray.400" fontSize="16px">
        {title}
      </Heading>
      {children}
    </Box>
  );
}

function Timeline() {
  // const breakpointColumnsObj = {
  //   default: 4,
  //   1100: 3,
  //   700: 2,
  //   500: 1,
  // };

  const timelineRanges = [
    {
      date: new Date(),
      items: [
        {
          type: 'image',
          content: [
            'https://placekitten.com/1920/1080',
            'https://placekitten.com/2400/2400',
            'https://placekitten.com/720/1080',
          ],
        },
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/Xwqw7O0IU-0',
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
            'https://placekitten.com/1920/1080',
            'https://placekitten.com/2400/2400',
            'https://placekitten.com/720/1080',
            'https://placekitten.com/1920/1080',
            'https://placekitten.com/1921/1081',
            'https://placekitten.com/2401/2401',
            'https://placekitten.com/721/1081',
          ],
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
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices leo ligula, quis porta libero viverra consectetur. Donec mollis euismod augue',
        },
      ],
    },
  ];

  const listPadding = 5;

  return (
    <Box mt={4}>
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
                <PseudoBox
                  display="inline-flex"
                  fontWeight={600}
                  mb={2}
                  color="gray.600"
                  fontSize="16px"
                >
                  {range.date.toLocaleString()}
                </PseudoBox>
                <Box>
                  {range.items.map(item => {
                    if (item.type === 'image') {
                      return (
                        <TimelineBox title="Fotoğraflar">
                          <Masonry
                            breakpointCols={3}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                          >
                            {item.content.map(imageURL => {
                              return <Image mb={4} src={imageURL} />;
                            })}
                          </Masonry>
                        </TimelineBox>
                      );
                    }

                    if (item.type === 'video') {
                      return (
                        <TimelineBox pb={4} title="Video">
                          <AspectRatioBox ratio={16 / 9}>
                            <Box
                              as="iframe"
                              src={item.content}
                              allowFullScreen
                            />
                          </AspectRatioBox>
                        </TimelineBox>
                      );
                    }

                    return (
                      <Box fontSize="16px" color="gray.500">
                        {item.content}
                      </Box>
                    );
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
