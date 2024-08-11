import React, { useState } from 'react';
import './FileUpload.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUpload({ label = 'Upload a File' }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className='file-upload-box'>
      <Button
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ color: '#4D5959', textTransform: 'none' }}
      >
        {label}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <br />
      {selectedFile && (
        <div className='file-info'>
          <p> {selectedFile.name}</p>
        </div>
      )}
    </div>
  );
}
