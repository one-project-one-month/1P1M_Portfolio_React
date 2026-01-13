import { imagePlaceholderUrl } from '@/assets/icons/iconUrls';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
  maxSize?: number;
  existingImageUrl?: string | null;
}

function FileUpload(props: Props) {
  var onFileSelect = props.onFileSelect;
  var accept = props.accept ?? 'image/*';
  var className = props.className ?? '';
  var maxSize = props.maxSize ?? 1 * 1024 * 1024;
  var existingImageUrl = props.existingImageUrl ?? null;

  var fileInputRef = useRef<HTMLInputElement | null>(null);
  var [preview, setPreview] = useState<string | null>(existingImageUrl);

  useEffect(
    function () {
      setPreview(existingImageUrl);
    },
    [existingImageUrl],
  );

  function handleClick(): void {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    var file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than ' + maxSize / (1024 * 1024) + 'MB');
      return;
    }

    if (file.type.startsWith('image/')) {
      var reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (typeof e.target?.result === 'string') {
          setPreview(e.target.result);
        }
      };

      reader.readAsDataURL(file);
    }

    if (onFileSelect) {
      onFileSelect(file);
    }
  }

  return (
    <div
      className={`bg-[#D9D9D9] w-[139px] h-[139px] flex justify-center items-center rounded-3xl cursor-pointer hover:bg-[#C5C5C5] transition-colors ${className}`}
      onClick={handleClick}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full rounded-3xl object-cover"
        />
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={imagePlaceholderUrl}
            alt="Image Placeholder"
            className="mb-2"
          />
        </div>
      )}

      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default FileUpload;