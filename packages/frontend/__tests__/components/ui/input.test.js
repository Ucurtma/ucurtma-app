/* eslint-env jest */
import React from 'react';
import { Formik } from 'formik';
import { render, fireEvent } from '@testing-library/react';
import Input from '../../../components/ui/input';

describe('Input Tests', () => {
  test('Renders Component', () => {
    const { container } = render(
      <Formik>
        <Input name="defaultName" label="defaultLabel" />
      </Formik>
    );
    const defaultClasses = 'flex flex-col mb-4';
    expect(container.firstChild).toHaveClass(defaultClasses);
  });

  test('Renders with custom container classes', () => {
    const { container } = render(
      <Formik>
        <Input
          containerClass="custom-container-class"
          name="defaultName"
          label="defaultLabel"
        />
      </Formik>
    );
    const defaultClasses = 'flex flex-col mb-4';
    expect(container.firstChild).toHaveClass(defaultClasses);
    expect(container.firstChild).toHaveClass('custom-container-class');
  });

  test('Renders label', () => {
    const { container } = render(
      <Formik>
        <Input
          name="defaultName"
          label="defaultLabel"
          labelClass="custom-label-class"
        />
      </Formik>
    );
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('mb-1 text-label');
    expect(label).toHaveClass('custom-label-class');
    expect(label.innerHTML).toBe('defaultLabel');
  });

  test('Renders input', () => {
    const { container } = render(
      <Formik>
        <Input
          name="defaultName"
          label="defaultLabel"
          labelClass="custom-label-class"
        />
      </Formik>
    );

    const input = container.querySelector('input');
    expect(input.name).toBe('defaultName');
    expect(input).toHaveClass(
      'py-2 px-4 text-lg rounded-lg shadow-light border border-solid color-text-color'
    );
  });

  test('Runs onChange function', () => {
    const { container, getByLabelText } = render(
      <Formik>
        <Input
          name="defaultName"
          label="defaultLabel"
          labelClass="custom-label-class"
        />
      </Formik>
    );
    fireEvent.change(getByLabelText('defaultLabel'), {
      target: { value: 'changedValue' },
    });
    const input = container.querySelector('input');
    expect(input.value).toBe('changedValue');
  });

  test('Dont change value if value defined', () => {
    const handleInputChange = jest.fn();
    const { container, getByLabelText } = render(
      <Formik>
        <Input
          name="defaultName"
          label="defaultLabel"
          value="stateValue"
          labelClass="custom-label-class"
          onChange={handleInputChange}
        />
      </Formik>
    );
    fireEvent.change(getByLabelText('defaultLabel'), {
      target: { value: 'changedValue' },
    });
    const input = container.querySelector('input');
    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('stateValue');
  });
});
