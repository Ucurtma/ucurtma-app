import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import Masonry from 'react-masonry-css';
import { LiteYouTubeEmbed } from 'react-lite-youtube-embed';
import './timeline.css';
// todo: use date-fns instead of moment since our date-picker is using date-fns.
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import TransactionRenderer from './transaction-renderer';

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
  const [transactionList, setTransactionList] = React.useState();
  const { t } = useTranslation('timeline');
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
    <>
      <Heading size="sm" mb={4} color="gray.500">
        {t('title')}
      </Heading>
      <Box mt={4} as="ul" m={0} listStyleType="none" pos="relative">
        {items.map((range, index) => (
          <Box
            pl={listPadding}
            as="li"
            pos="relative"
            _before={
              items?.length > 1 && {
                content: `' '`,
                position: 'absolute',
                left: 'calc(0.75rem / 2)',
                width: '1px',
                height: index === items.length - 1 ? '16px' : '200%',
                bg: 'gray.300',
                top: index === 0 && '16px',
              }
            }
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
              <Box
                display="inline-flex"
                fontWeight={600}
                mb={2}
                color="gray.600"
                fontSize="16px"
              >
                {range.date}
              </Box>
              <Box>
                {range.subItems.map((item, i) => {
                  const { type } = item;
                  if (type === 'IMAGE') {
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

                  if (type === 'VIDEO') {
                    return (
                      <TimelineBox key={i.toString()} pb={4} title="Video">
                        <LiteYouTubeEmbed
                          id={item.content}
                          title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
                        />
                      </TimelineBox>
                    );
                  }

                  if (type === 'INCOMINGTX' || type === 'OUTGOINGTX') {
                    const isIncoming = type === 'INCOMINGTX';
                    return (
                      <TimelineBox
                        key={i.toString()}
                        py={2}
                        bg={isIncoming ? 'green.50' : 'red.50'}
                        borderColor={isIncoming ? 'green.100' : 'red.100'}
                      >
                        <TransactionRenderer
                          item={item}
                          type={type}
                          transactionList={transactionList}
                          range={range}
                        />
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
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Timeline;
