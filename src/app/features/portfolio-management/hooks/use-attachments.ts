import { useState } from 'react';
import type { UploadedFile } from '../services/attachment-service';
import {
  deleteFile,
  uploadFile,
  validateUrl,
} from '../services/attachment-service';

export const useAttachments = (initialAttachments: UploadedFile[] = []) => {
  const [attachments, setAttachments] =
    useState<UploadedFile[]>(initialAttachments);
  const [linkInput, setLinkInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedFile = await uploadFile(file);
      setAttachments([...attachments, uploadedFile]);
      setLinkInput(uploadedFile.url);
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddLink = () => {
    if (!linkInput.trim()) return;

    const validatedLink = validateUrl(linkInput);
    if (validatedLink) {
      setAttachments([...attachments, validatedLink]);
      setLinkInput('');
      setUploadError(null);
    } else {
      setUploadError('Please enter a valid URL (http:// or https://)');
    }
  };

  const handleRemoveAttachment = async (id: string) => {
    const attachment = attachments.find((a) => a.id === id);
    if (attachment?.type === 'file') {
      try {
        await deleteFile(id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
    setAttachments(attachments.filter((a) => a.id !== id));
  };

  const clearAll = () => {
    setAttachments([]);
    setLinkInput('');
    setUploadError(null);
  };

  return {
    attachments,
    setAttachments,
    linkInput,
    setLinkInput,
    isUploading,
    uploadError,
    setUploadError,
    handleFileUpload,
    handleAddLink,
    handleRemoveAttachment,
    clearAll,
  };
};
