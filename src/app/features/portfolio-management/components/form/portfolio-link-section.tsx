import InputField from '@/components/ui/input-field';
import { FilePlus } from 'lucide-react';
import React from 'react';
import { uploadFile } from '../../services/attachment-service';

interface PortfolioLinkSectionProps {
  projectLink: string;
  setProjectLink: (link: string) => void;
  projectLinkName?: string;
  setProjectLinkName?: (name: string) => void;
  isReadOnly: boolean;
}

export const PortfolioLinkSection = ({
  projectLink,
  setProjectLink,
  isReadOnly,
}: PortfolioLinkSectionProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        setProjectLink(uploadedFile.url);
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        setProjectLink(uploadedFile.url);
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-white">Attachment</h2>

      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-[#F9FAFB]">
            Add Link of your project
          </label>
          {isReadOnly ? (
            <div className="px-3 py-2 bg-[#1e293b] rounded-md text-[#6A7282] min-h-[40px] text-sm flex items-center">
              {projectLink || 'No link provided'}
            </div>
          ) : (
            <InputField
              className="text-sm text-[#6A7282] w-full"
              placeholder="http://"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          )}
        </div>

        {!isReadOnly && (
          <div
            className="border-2 border-dashed border-[#FFFFFF26] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#FFFFFF05] transition-colors cursor-pointer bg-[#FFFFFF17]"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept=".svg,.png,.jpg,.jpeg,.gif"
            />
            <div className="bg-[#FFFFFF17] p-3 rounded-full mb-3">
              <FilePlus className="text-gray-400" size={24} />
            </div>
            <p className="text-sm text-[#6A7282]">Add File</p>
          </div>
        )}
      </div>
    </div>
  );
};
