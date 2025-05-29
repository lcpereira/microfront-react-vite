import React, { useRef } from 'react';
import Button from './Button';

type FileUploadProps = {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onUpload: (files: FileList) => void;
};

export default function FileUpload({
  label = 'Selecionar Arquivo',
  accept = '*',
  multiple = false,
  onUpload,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onUpload(event.target.files);
      event.target.value = '';
    }
  };

  return (
    <>
      <Button type="button" onClick={handleClick}>
        {label}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </>
  );
}
