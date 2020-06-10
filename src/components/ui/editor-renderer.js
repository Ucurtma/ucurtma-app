import React from 'react';
import { Box, Heading, Image } from '@chakra-ui/core';
import { LiteYouTubeEmbed } from 'react-lite-youtube-embed';

function EditorRenderer({ blocks }) {
  let mappableBlocks = blocks;
  if (blocks.blocks) mappableBlocks = blocks.blocks;

  function createMarkup(html) {
    return { __html: html };
  }

  function renderEmbed(options, index) {
    // to improve services, look here: https://github.com/editor-js/embed/blob/2d359ffc65661595b5c3188841f85728054c33e3/src/services.js
    if (options.service === 'youtube') {
      const linkArr = options.embed.split('/');
      let videoId = linkArr[linkArr.length - 1];
      videoId = videoId.substring(0, videoId.length - 1);
      return (
        <Box key={index.toString()}>
          <LiteYouTubeEmbed id={videoId} />
        </Box>
      );
    }
    return null;
  }

  function renderHeader(options, index) {
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

    return (
      <Heading
        key={index.toString()}
        my={4}
        as={`h${options.level}`}
        size={sizes[`${options.level - 1}`]}
      >
        {options.text}
      </Heading>
    );
  }

  function renderParagraph(options, index) {
    return (
      <Box
        key={index.toString()}
        p=".4rem 0"
        dangerouslySetInnerHTML={createMarkup(options.text)}
      />
    );
  }

  function renderImage(options, index) {
    return (
      <Box
        border={options.withBorder && '2px solid'}
        borderColor="gray.100"
        my={4}
      >
        <Image key={index.toString()} src={options.file.url} />
      </Box>
    );
  }

  return (
    <Box id="editorjs-renderer">
      {mappableBlocks.map((block, blockIndex) => {
        if (block.type === 'embed') {
          return renderEmbed(block.data, blockIndex);
        }

        if (block.type === 'header') {
          return renderHeader(block.data, blockIndex);
        }

        if (block.type === 'paragraph') {
          return renderParagraph(block.data, blockIndex);
        }

        if (block.type === 'image') {
          return renderImage(block.data, blockIndex);
        }

        return <div key={blockIndex.toString()}>deneme</div>;
      })}
    </Box>
  );
}

export default EditorRenderer;
