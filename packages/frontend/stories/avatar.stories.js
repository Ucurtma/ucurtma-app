import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import Avatar from '../components/ui/avatar';

storiesOf('Avatar', module)
  .add('Default Avatar', () => (
    <Avatar
      className={text('Classname')}
      type={select('Type', ['xs', 'normal', 'lg'], 'normal')}
      imagePath="/img/placeholder-image-02.jpg"
    />
  ))
  .add('Avatar without Image', () => (
    <Avatar
      className={text('Classname')}
      type={select('Type', ['xs', 'normal', 'lg'], 'normal')}
    />
  ));
