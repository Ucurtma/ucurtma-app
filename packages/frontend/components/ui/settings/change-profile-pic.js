import React from 'react';
import PropTypes from 'prop-types';
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
  isAvatarExist,
  avatarURL,
}) {
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="paragraph">
          Profile Picture
        </Heading>
      )}
      <Box mb={4}>
        {avatarURL && <Avatar data-testid="avatar" size="lg" src={avatarURL} />}
      </Box>
      <ButtonGroup spacing={4}>
        <VisuallyHidden
          as="input"
          accept="image/*"
          id="text-button-file"
          type="file"
          onChange={e => onChange(e)}
        />
        <FormLabel htmlFor="text-button-file">
          <Button
            as="span"
            variant="ghost"
            leftIcon={Upload}
            color="linkBlue"
            size="sm"
          >
            {isAvatarExist ? 'Fotoğrafı Değiştir ' : 'Fotoğraf Ekle'}
          </Button>
        </FormLabel>
        {isAvatarExist && (
          <Button
            onClick={e => onChange(e, 'delete')}
            variant="ghost"
            leftIcon={Trash}
            color="danger"
            size="sm"
          >
            Fotoğrafı Sil
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

ChangeProfilePicture.defaultProps = {
  withTitle: true,
};

ChangeProfilePicture.propTypes = {
  onChange: PropTypes.func,
  isAvatarExist: PropTypes.bool,
  withTitle: PropTypes.bool,
  avatarURL: PropTypes.string,
};

export default ChangeProfilePicture;
