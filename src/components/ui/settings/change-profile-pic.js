import React from 'react';
import {
  ButtonGroup,
  Button,
  Heading,
  VisuallyHidden,
  FormLabel,
  Avatar,
  Box,
} from '@chakra-ui/core';
import { Upload, Trash } from 'react-feather';

function ChangeProfilePicture({
  onChange,
  withTitle,
  title,
  accept,
  isFileExist,
  avatarURL,
  name,
}) {
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="gray.600">
          {title}
        </Heading>
      )}
      <Box mb={4}>
        {avatarURL && <Avatar data-testid="avatar" size="lg" src={avatarURL} />}
      </Box>
      <ButtonGroup spacing={4}>
        <VisuallyHidden
          as="input"
          accept={accept}
          id={name}
          type="file"
          onChange={e => onChange(e)}
        />
        <FormLabel htmlFor={name}>
          <Button
            as="span"
            variant="ghost"
            leftIcon={<Upload />}
            color="linkBlue.400"
            size="sm"
          >
            {isFileExist ? 'Dosyayı Değiştir' : 'Dosya Ekle'}
          </Button>
        </FormLabel>
        {isFileExist && (
          <Button
            onClick={e => onChange(e, 'delete')}
            variant="ghost"
            leftIcon={<Trash />}
            color="danger"
            size="sm"
          >
            Dosyayı Sil
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

ChangeProfilePicture.defaultProps = {
  withTitle: true,
  title: 'Fotoğraf',
  accept: 'image/*',
};

export default ChangeProfilePicture;
