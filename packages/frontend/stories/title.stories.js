import React from 'react';
import { text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import Title from '../components/ui/title';

storiesOf('Title', module).add('Default Title', () => (
  <Title className={text('Classname', 'mt-10 ml-10')}>
    {text('Text', 'Why you choouse us?')}
  </Title>
));
