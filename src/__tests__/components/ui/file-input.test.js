/* eslint-env jest */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { render, wait, fireEvent } from '../../../utils/test-utils';
import FileInput from '../../../components/ui/file-input';

describe('File Input Tests', () => {
  test('Renders Label', () => {
    const { queryByText } = render(
      <Formik>
        <FileInput
          label="Transcript"
          name="transcript"
          accept="application/pdf"
        />
      </Formik>
    );
    expect(queryByText('Transcript')).toBeInTheDocument();
  });

  test('Accessibility', () => {
    const { getByLabelText } = render(
      <Formik>
        <FileInput
          label="Transcript"
          name="transcript"
          accept="application/pdf"
        />
      </Formik>
    );
    const inputNode = getByLabelText('Transcript');
    expect(inputNode.getAttribute('aria-label')).toBe('Transcript');
    expect(inputNode.getAttribute('aria-describedby')).toBe('Transcript');
  });

  test('Renders errors', async () => {
    const signupSchema = Yup.object().shape({
      transcript: Yup.mixed()
        .required('Transcript file is required')
        .test('fileFormat', 'PDF only', value => {
          return value && ['application/pdf'].includes(value.type);
        }),
    });

    const rows = ['NAME,ADDRESS,ZIP'];
    const file = new File([rows.join('\n')], 'some.csv');
    const deleteFunc = jest.fn();

    const { getByLabelText, queryByText, container } = render(
      <Formik
        initialValues={{
          transcript: '',
        }}
        validationSchema={signupSchema}
      >
        <FileInput
          label="Transcript"
          name="transcript"
          accept="application/pdf"
          onDelete={deleteFunc}
        />
      </Formik>
    );

    const inputNode = getByLabelText('Transcript');
    await fireEvent.blur(inputNode);
    await fireEvent.change(inputNode, { target: { files: undefined } });
    await wait();
    expect(container.querySelector('input').files.length).toEqual(0);
    expect(queryByText('Transcript file is required')).not.toBeNull();
    await fireEvent.change(inputNode, { target: { files: [file] } });
    await wait();
    expect(container.querySelector('input').files.length).toEqual(1);
  });
});
