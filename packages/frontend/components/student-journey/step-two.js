import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import StepTitle from './step-title';
import Paragraph from '../ui/paragraph';
import Card from '../ui/card';
import DropBox from '../ui/drop-box';
import IdCardIcon from '../../icons/id-card';

function StepTwo() {
  // eslint-disable-next-line no-unused-vars
  const onDrop = useCallback((acceptedFile, type) => {}, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: file => onDrop(file, 'Others'),
    noClick: true,
  });

  return (
    <div className="flex flex-col">
      <div className="w-full sm:w-6/12 px-4 sm:px-0">
        <StepTitle
          fullWidth
          step="02"
          title="Upload documents, Verify yourself."
        >
          <Paragraph>
            You can prove yourself with any of bellow documents. You can use ID
            card, Driving Licence or... Select ones.
          </Paragraph>
        </StepTitle>
      </div>
      <div {...getRootProps()} className="mt-8">
        <Card className="flex flex-wrap sm:flex-no-wrap">
          <DropBox
            icon={IdCardIcon}
            type="ID Card"
            onDrop={(file, type) => onDrop(file, type)}
          />
          <DropBox
            icon={IdCardIcon}
            type="Driving Licence"
            onDrop={(file, type) => onDrop(file, type)}
          />
          <DropBox
            icon={IdCardIcon}
            type="Others"
            onDrop={(file, type) => onDrop(file, type)}
            active={isDragActive}
          />
        </Card>
      </div>
    </div>
  );
}

export default StepTwo;
