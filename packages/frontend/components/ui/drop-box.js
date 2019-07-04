import React from 'react';
import IdCardIcon from '../../icons/id-card';

function DropBox() {
  return (
    <div className="drop-box w-full border-2 border-dashed border-drop-box rounded-2 min-h-100 mx-12 p-10 shadow-light">
      <IdCardIcon />
    </div>
  );
}

export default DropBox;
