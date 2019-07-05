import React from 'react';
import { Formik } from 'formik';
import { boolean } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../components/ui/checkbox';

storiesOf('Checkbox', module)
  .add('Empty checkbox', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Checkbox
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          name="example"
        />
      </Formik>
    </div>
  ))
  .add('Empty checkbox with label', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Checkbox
          label="This is a label"
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          name="example"
        />
      </Formik>
    </div>
  ))
  .add('Checked checkbox', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Checkbox
          checked
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          onChange={action('change value')}
          name="example"
        />
      </Formik>
    </div>
  ))
  .add('Checked checkbox with label', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Checkbox
          label="This is a label"
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          checked
          onChange={action('change value')}
          name="example"
        />
      </Formik>
    </div>
  ))
  .add('Dangerous checkbox', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Checkbox
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          onChange={action('change value')}
          checked
          type="danger"
          name="example"
        />
      </Formik>
    </div>
  ))
  .add('Dangerous checkbox with label', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Checkbox
          label="This is a label"
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          checked
          type="danger"
          onChange={action('change value')}
          name="example"
        />
      </Formik>
    </div>
  ));
