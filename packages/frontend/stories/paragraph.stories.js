import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import Paragraph from '../components/ui/paragraph';

storiesOf('Paragraph', module)
  .add('Default Paragraph', () => (
    <Paragraph
      className={text('Classname', 'mt-10 ml-10')}
      variant={select('Type', ['xs', 'normal', 'lg'], 'normal')}
    >
      {text(
        'Text',
        'Hey Gheorge, do you have money enought to give me? No? OK, never mind.'
      )}
    </Paragraph>
  ))
  .add('Big Paragraph', () => (
    <Paragraph
      className={text('Classname', 'mt-10 ml-10')}
      variant={select('Type', ['xs', 'normal', 'lg'], 'lg')}
    >
      {text(
        'Text',
        'Hey Gheorge, do you have money enought to give me? No? OK, never mind.'
      )}
    </Paragraph>
  ))
  .add('Small Paragraph', () => (
    <Paragraph
      className={text('Classname', 'mt-10 ml-10')}
      variant={select('Type', ['xs', 'normal', 'lg'], 'xs')}
    >
      {text(
        'Text',
        'Hey Gheorge, do you have money enought to give me? No? OK, never mind.'
      )}
    </Paragraph>
  ));
