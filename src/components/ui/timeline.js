import React from 'react';
import {
  Box,
  PseudoBox,
  Image,
  Heading,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Collapse,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/core';
import Masonry from 'react-masonry-css';
import { LiteYouTubeEmbed } from 'react-lite-youtube-embed';
import './timeline.css';
// todo: use date-fns instead of moment since our date-picker is using date-fns.
import moment from 'moment';

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
      {title && (
        <Heading pb={4} size="sm" color="gray.400" fontSize="16px">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
}

function Timeline({ items, transactions }) {
  const [show, setShow] = React.useState({ show: false, index: -1, date: '' });
  const [transactionList, setTransactionList] = React.useState();
  const listPadding = 5;

  React.useEffect(() => {
    const newTransactions = transactions.map(transaction => {
      const dateToUTC = moment(parseInt(transaction.when, 10))
        .utc()
        .format('DD.MM.YYYY');

      return {
        ...transaction,
        when: dateToUTC,
      };
    });

    setTransactionList(newTransactions);
  }, [transactions]);

  return (
    <Box mt={4}>
      <PseudoBox as="ul" m={0} listStyleType="none" pos="relative">
        {items.map((range, index) => {
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
                height: index === items.length - 1 ? '16px' : '200%',
                bg: 'gray.300',
                top: index === 0 && '16px',
              }}
              overflow="hidden"
              key={index.toString()}
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
                  {range.date}
                </PseudoBox>
                <Box>
                  {range.subItems.map((item, i) => {
                    if (item.type === 'IMAGE') {
                      return (
                        <TimelineBox key={i.toString()} title="Fotoğraflar">
                          <Masonry
                            breakpointCols={3}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                          >
                            {item.content.map((imageURL, itemIndex) => {
                              return (
                                <Image
                                  key={itemIndex.toString()}
                                  mb={4}
                                  src={imageURL}
                                />
                              );
                            })}
                          </Masonry>
                        </TimelineBox>
                      );
                    }

                    if (item.type === 'VIDEO') {
                      return (
                        <TimelineBox key={i.toString()} pb={4} title="Video">
                          <LiteYouTubeEmbed
                            id={item.content}
                            title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
                          />
                        </TimelineBox>
                      );
                    }

                    if (
                      item.type === 'INCOMINGTX' ||
                      item.type === 'OUTGOINGTX'
                    ) {
                      const isIncoming = item.type === 'INCOMINGTX';
                      return (
                        <TimelineBox
                          key={i.toString()}
                          py={2}
                          bg={isIncoming ? 'green.50' : 'red.50'}
                          borderColor={isIncoming ? 'green.100' : 'red.100'}
                        >
                          <StatGroup
                            cursor="pointer"
                            {...(transactions && {
                              onClick: () =>
                                setShow({
                                  show:
                                    show.index === i && show.date === range.date
                                      ? !show.show
                                      : true,
                                  index: i,
                                  date: range.date,
                                }),
                            })}
                          >
                            <Stat>
                              <StatLabel
                                color="gray.400"
                                fontWeight={800}
                                fontSize={14}
                              >
                                İşlem Sayısı
                              </StatLabel>
                              <StatNumber color="gray.700" fontSize={18}>
                                {item.content.length}
                              </StatNumber>
                            </Stat>
                            <Stat>
                              <StatLabel
                                color="gray.400"
                                fontWeight={800}
                                fontSize={14}
                              >
                                {isIncoming
                                  ? 'Gelen Destek'
                                  : 'Harcanan Destek'}
                              </StatLabel>
                              <StatNumber
                                display="flex"
                                alignItems="center"
                                color="gray.700"
                                fontSize={18}
                              >
                                <Image
                                  maxW="10px"
                                  width="full"
                                  height="full"
                                  src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                                  mr={1}
                                />
                                {Math.floor(
                                  item.content.reduce(
                                    (a, b) => parseFloat(a) + parseFloat(b),
                                    0
                                  )
                                )}
                              </StatNumber>
                            </Stat>
                          </StatGroup>
                          {transactionList && (
                            <Collapse
                              mt={4}
                              isOpen={
                                show.show &&
                                show.index === i &&
                                show.date === range.date
                              }
                            >
                              {transactionList.map(
                                (transaction, transactionIndex) => {
                                  const transactionType = isIncoming
                                    ? 'IN'
                                    : 'OUT';
                                  if (
                                    transaction.when === range.date &&
                                    transactionType === transaction.type
                                  ) {
                                    return (
                                      <PseudoBox
                                        key={transactionIndex.toString()}
                                        fontSize={14}
                                        borderBottom="1px solid"
                                        borderColor="gray.200"
                                        py={2}
                                        _first={{ pt: 0 }}
                                        _last={{ borderBottom: 0 }}
                                      >
                                        <Flex justifyContent="space-between">
                                          <Box as="strong" color="gray.400">
                                            {isIncoming ? 'Kimden:' : 'Kime:'}
                                          </Box>
                                          <Popover usePortal trigger="hover">
                                            <PopoverTrigger>
                                              <Box
                                                overflow="hidden"
                                                textOverflow="ellipsis"
                                                maxW="200px"
                                              >
                                                {transaction.from}
                                              </Box>
                                            </PopoverTrigger>
                                            <PopoverContent
                                              bg="gray.800"
                                              color="gray.50"
                                              wordBreak="break-all"
                                              p={2}
                                              fontSize={13}
                                              textAlign="center"
                                              width="auto"
                                            >
                                              {transaction.from}
                                            </PopoverContent>
                                          </Popover>
                                        </Flex>
                                        <Flex
                                          mt={1}
                                          justifyContent="space-between"
                                        >
                                          <Box as="strong" color="gray.400">
                                            Ne kadar:
                                          </Box>
                                          <Flex>
                                            <Image
                                              maxW="8px"
                                              width="full"
                                              height="full"
                                              src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                                              mr={1}
                                            />
                                            {Math.floor(
                                              parseInt(transaction.amount, 10)
                                            )}
                                          </Flex>
                                        </Flex>
                                      </PseudoBox>
                                    );
                                  }
                                  return null;
                                }
                              )}
                            </Collapse>
                          )}
                        </TimelineBox>
                      );
                    }

                    return (
                      <Box key={i.toString()} fontSize="16px" color="gray.500">
                        {item.content.map((content, contentIndex) => {
                          return (
                            <Text key={contentIndex.toString()}>{content}</Text>
                          );
                        })}
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
