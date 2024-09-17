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

export default function FileUpload({ label = 'Upload Files', onFilesChange, multiple = true, accept = 'image/*', index }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    if (onFilesChange) {
      if (index) {
        onFilesChange(files, index);
      } else {
        onFilesChange(files);
      }

    }
  };

  return (
    <>
      <div className='file-upload-box'>
        <Button
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ color: '#4D5959', textTransform: 'none' }}
        >
          {label}
          <VisuallyHiddenInput
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
        </Button>
        <br />

      </div>
      <div style={{ marginLeft: '20px', marginTop: 10, }}>
        {selectedFiles.length > 0 && (
          <div className='file-info'>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
