import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonGroup,
  Button,
  Heading,
  VisuallyHidden,
  FormLabel,
} from '@chakra-ui/core';
import { Upload, Trash } from 'react-feather';

function ChangeProfilePicture({ onChange, withTitle, isAvatarExist }) {
  return (
    <>
      {withTitle && (
        <Heading my={4} size="sm" color="paragraph">
          Profile Picture
        </Heading>
      )}
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
            {isAvatarExist ? 'Change ' : 'Add '} Profile Picture
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
            Delete Profile Picture
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
};

export default ChangeProfilePicture;
