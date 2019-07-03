import React from 'react';
import { text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import Avatar from '../components/ui/avatar';

storiesOf('Avatar', module)
  .add('Small Avatar', () => (
    <Avatar
      className={text('Classname')}
      type="xs"
      image="/img/placeholder-image-02.jpg"
    />
  ))
  .add('Normal Avatar', () => (
    <Avatar
      className={text('Classname')}
      type="normal"
      image="/img/placeholder-image-02.jpg"
    />
  ))
  .add('Large Avatar', () => (
    <Avatar
      className={text('Classname')}
      type="lg"
      image="/img/placeholder-image-02.jpg"
    />
  ))
  .add('Avatar without Image', () => (
    <Avatar className={text('Classname')} type="lg" />
  ));
