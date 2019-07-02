import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../components/ui/checkbox';

storiesOf('Checkbox', module)
  .add('Empty checkbox', () => (
    <div className="my-10 mx-10">
      <Checkbox
        disabled={boolean('Disabled Status', false)}
        required={boolean('Required Status', false)}
      />
    </div>
  ))
  .add('Empty checkbox with label', () => (
    <div className="my-10 mx-10">
      <Checkbox
        label="This is a label"
        disabled={boolean('Disabled Status', false)}
        required={boolean('Required Status', false)}
      />
    </div>
  ))
  .add('Checked checkbox', () => (
    <div className="my-10 mx-10">
      <Checkbox
        checked
        type="success"
        disabled={boolean('Disabled Status', false)}
        required={boolean('Required Status', false)}
        onChange={action('change value')}
      />
    </div>
  ))
  .add('Checked checkbox with label', () => (
    <div className="my-10 mx-10">
      <Checkbox
        label="This is a label"
        type="success"
        disabled={boolean('Disabled Status', false)}
        required={boolean('Required Status', false)}
        checked
        onChange={action('change value')}
      />
    </div>
  ))
  .add('Dangerous checkbox', () => (
    <div className="my-10 mx-10">
      <Checkbox
        disabled={boolean('Disabled Status', false)}
        required={boolean('Required Status', false)}
        onChange={action('change value')}
        checked
        type="danger"
      />
    </div>
  ))
  .add('Dangerous checkbox with label', () => (
    <div className="my-10 mx-10">
      <Checkbox
        label="This is a label"
        disabled={boolean('Disabled Status', false)}
        required={boolean('Required Status', false)}
        checked
        type="danger"
        onChange={action('change value')}
      />
    </div>
  ));
