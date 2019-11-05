/* eslint-env jest */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { render, wait, fireEvent } from 'test-utils';
import userEvent from '@testing-library/user-event';
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
    expect(inputNode.getAttribute('aria-describedby')).toBe('email');
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

  test('Renders errors', async () => {
    const signupSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    });

    const { getByLabelText, queryByText } = render(
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={signupSchema}
      >
        <Input type="email" name="email" placeholder="(ex. mail@mail.com)" />
      </Formik>
    );
    const inputNode = getByLabelText('email');
    await fireEvent.blur(inputNode);
    await userEvent.type(inputNode, 'mail');
    await wait();
    expect(inputNode).toHaveAttribute('value', 'mail');
    expect(queryByText('Invalid email')).not.toBeNull();
    await userEvent.type(inputNode, 'mail@mail.com');
    await wait();
    expect(inputNode).toHaveAttribute('value', 'mail@mail.com');
    expect(queryByText('Invalid email')).toBeNull();
  });
});
