import { imagePlaceholderUrl } from "@/assets/icons/iconUrls";
import React, { useRef, useState, useEffect, type ChangeEvent,type KeyboardEvent } from "react";

interface FileUploadProps {
  /** Callback returning the selected File object */
  onFileSelect?: (file: File) => void;
  /** Callback returning error message string */
  onError?: (errorMessage: string) => void;
  /** MIME types to accept (default: "image/*") */
  accept?: string;
  /** Additional CSS classes */
  className?: string;
  /** Max file size in bytes (default: 1MB) */
  maxSize?: number;
  /** Initial image URL to display */
  existingImageUrl?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onError,
  accept = "image/*",
  className = "",
  maxSize = 1 * 1024 * 1024, // 1MB default
  existingImageUrl = null,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existingImageUrl);

  // Sync state if prop changes
  useEffect(() => {
    setPreview(existingImageUrl ?? null);
  }, [existingImageUrl]);

  // Cleanup Object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview && preview !== existingImageUrl && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, existingImageUrl]);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerFileSelect();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 1. Size Validation
    if (file.size > maxSize) {
      const sizeInMB = (maxSize / (1024 * 1024)).toFixed(0);
      const errorMessage = `File size must be less than ${sizeInMB}MB`;

      if (onError) {
        onError(errorMessage);
      } else {
        console.warn(errorMessage);
        alert(errorMessage);
      }

      // Reset input so user can try again immediately
      e.target.value = "";
      return;
    }

    // 2. Type Validation & Preview Generation
    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }

    // 3. Callback
    if (onFileSelect) {
      onFileSelect(file);
    }

    // 4. Reset Input Value
    e.target.value = "";
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image"
      onKeyDown={handleKeyDown}
      onClick={triggerFileSelect}
      className={`
        relative overflow-hidden
        bg-[#D9D9D9] hover:bg-[#C5C5C5] 
        w-[139px] h-[139px] 
        flex justify-center items-center 
        rounded-3xl cursor-pointer 
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
      `}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center pointer-events-none">
          <img
            src={imagePlaceholderUrl}
            alt=""
            className="mb-2 w-8 h-8 opacity-60"
          />
          <span className="text-xs text-gray-500 font-medium">Upload</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;