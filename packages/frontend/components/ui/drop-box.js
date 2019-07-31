import React from 'react';
import cls from 'classnames';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import Paragraph from './paragraph';
import DropFileIcon from '../../icons/drop-file-icon';

function DropBox({ icon, type, onDrop, active }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: file => onDrop(file, type),
  });

  const Icon = icon;

  let classes = {
    box: 'border-drop-box-disabled hover:border-drop-box',
    paragraph: 'text-drop-box-disabled group-hover:text-drop-box',
  };

  if (isDragActive || active) {
    classes = {
      box: 'border-drop-box',
      paragraph: 'text-drop-box',
    };
  }

  return (
    <div
      {...getRootProps()}
      className={cls(
        'group drop-box w-full border-2 border-dashed rounded-2 min-h-88 mx-0 my-4 sm:my-0 sm:mx-12 shadow-light transition',
        classes.box
      )}
    >
      <input {...getInputProps({ multiple: false })} />

      <div className="flex flex-col justify-around h-full">
        {icon &&
          (!isDragActive ? (
            <Icon
              noSize
              className="max-h-23 opacity-25 group-hover:opacity-100 transition"
            />
          ) : (
            <DropFileIcon noSize className="max-h-23 transition" />
          ))}
        {type && (
          <Paragraph
            variant="lg"
            className={cls(
              'text-center font-bold transition',
              classes.paragraph
            )}
          >
            {type}
          </Paragraph>
        )}
      </div>
    </div>
  );
}

DropBox.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  type: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default DropBox;
