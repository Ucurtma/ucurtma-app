import React, { useEffect, useRef, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/core';
import { useField, useFormikContext } from 'formik';

function MdEditor({ type, onChange, label, options, disabled, ...otherProps }) {
  const [field, meta] = useField(otherProps);
  const [initialValue, setInitialValue] = useState(meta.initialValue);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const editor = useRef(null);

  useEffect(() => {
    if (disabled) {
      editor.current.simpleMde.codemirror.setOption('readOnly', true);
    } else {
      editor.current.simpleMde.codemirror.setOption('readOnly', false);
    }
  }, [disabled]);

  useEffect(() => {
    if (meta.initialValue) {
      setInitialValue(meta.initialValue);
    }
  }, [meta.initialValue]);

  return (
    <FormControl width="100%" isInvalid={meta.error && meta.touched} mb={4}>
      {label && <FormLabel color="gray.600">{label}</FormLabel>}
      <SimpleMDE
        onChange={val => {
          setFieldValue(field.name, val);
          setFieldTouched(field.name, true);
        }}
        ref={editor}
        options={{
          spellChecker: false,
          nativeSpellcheck: false,
          status: false,
          promptURLs: true,
          promptTexts: {
            image: "Resim URL'ini giriniz:",
            link: "Eklemek istediğiniz linkin URL'ini giriniz:",
          },
          initialValue,
          ...options,
        }}
        value={meta.value}
        id="ucurtma-editor"
        name={field.name}
        {...otherProps}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

export default MdEditor;
