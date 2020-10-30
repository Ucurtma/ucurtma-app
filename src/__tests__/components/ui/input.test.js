/* eslint-env jest */
import React from 'react';
import { Formik } from 'formik';
import { render } from '../../../utils/test-utils';
import Input from '../../../components/ui/input';

describe('Input Tests', () => {
  test('Renders Label', () => {
    const { getByText } = render(
      <Formik>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="(ex. mail@mail.com)"
        />
      </Formik>
    );
    expect(getByText('Email')).toBeInTheDocument();
  });

  test('Accessibility', () => {
    const { getByLabelText } = render(
      <Formik>
        <Input type="email" name="email" placeholder="(ex. mail@mail.com)" />
      </Formik>
    );
    const inputNode = getByLabelText('email');
    expect(inputNode.getAttribute('aria-label')).toBe('email');
  });

  test('Renders given type', () => {
    const { getByLabelText } = render(
      <Formik>
        <Input type="email" name="email" placeholder="(ex. mail@mail.com)" />
      </Formik>
    );
    const inputNode = getByLabelText('email');
    expect(inputNode.getAttribute('type')).toBe('email');
  });

  test('Renders text if type isnt defined', () => {
    const { getByLabelText } = render(
      <Formik>
        <Input name="email" placeholder="(ex. mail@mail.com)" />
      </Formik>
    );
    const inputNode = getByLabelText('email');
    expect(inputNode.getAttribute('type')).toBe('text');
  });
});
