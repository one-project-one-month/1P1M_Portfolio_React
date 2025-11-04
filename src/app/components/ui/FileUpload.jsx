import { imagePlaceholderUrl } from "@/assets/icons/iconUrls";
import { useRef, useState, useEffect } from "react";

function FileUpload({
  onFileSelect,
  accept = "image/*",
  className = "",
  maxSize = 1 * 1024 * 1024, // 1MB default
  existingImageUrl = null,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(existingImageUrl);

  useEffect(() => {
    setPreview(existingImageUrl);
  }, [existingImageUrl]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxSize) {
        alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      }
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

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
