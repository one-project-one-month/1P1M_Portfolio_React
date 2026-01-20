import FileUpload from '@/components/ui/file-upload';
import type { DropdownItem } from '@/types/portfolio-management';
import { ChevronDown } from 'lucide-react';
import React, { useRef, useState } from 'react';
import type { ProjectData } from '../../constants/data';
import { statusOptions } from '../../constants/data';
import { uploadProjectImage } from '../../services/image-upload-service';
import StatusDropdown from '../status-dropdown';
import DatePickerDialog from './date-picker-dialog';

interface PortfolioBasicInfoProps {
  initialData?: ProjectData | null;
  projectName: string;
  setProjectName: (name: string) => void;
  status: DropdownItem | null;
  setStatus: (status: DropdownItem | null) => void;
  description: string;
  setDescription: (desc: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  completedDate: string;
  setCompletedDate: (date: string) => void;
  projectImage: string;
  setProjectImage: (image: string) => void;
  isReadOnly: boolean;
}

export const PortfolioBasicInfo = ({
  initialData,
  projectName,
  setProjectName,
  status,
  setStatus,
  description,
  setDescription,
  startDate,
  setStartDate,
  completedDate,
  setCompletedDate,
  projectImage,
  setProjectImage,
  isReadOnly,
}: PortfolioBasicInfoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'start' | 'complete'>(
    'start',
  );

  const openDatePicker = (field: 'start' | 'complete') => {
    setActiveDateField(field);
    setDatePickerOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadProjectImage(file);
        setProjectImage(imageUrl);
      } catch (error) {
        console.error('Image upload failed', error);
      }
    }
  };

  const triggerFileUpload = () => {
    if (!isReadOnly) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-lg font-medium">Project Basic Information</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Project Image */}
        <div className="shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {projectImage || initialData?.image ? (
            <div
              className={`w-[153px] h-[153px] rounded-lg overflow-hidden border border-[#FFFFFF]/15 ${!isReadOnly ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              onClick={triggerFileUpload}
            >
              <img
                src={projectImage || initialData?.image || ''}
                alt="Project"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="shrink-0" onClick={triggerFileUpload}>
              <div
                className={`w-[153px] h-[153px] rounded-lg flex items-center justify-center ${!isReadOnly ? 'cursor-pointer' : ''}`}
              >
                <FileUpload className="pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between gap-4">
          {/* Project Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Project Name*</label>
            {isReadOnly ? (
              <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
                {projectName || '-'}
              </p>
            ) : (
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter your project name"
                className="w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC]"
              />
            )}
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            {isReadOnly ? (
              <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
                {status?.name || '-'}
              </p>
            ) : (
              <StatusDropdown
                placeholder="Select current status"
                menuList={statusOptions}
                selectedValue={status}
                onChange={setStatus}
                className="text-sm text-[#6A7282]"
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Project Description</label>
        {isReadOnly ? (
          <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[80px] whitespace-pre-wrap">
            {description || '-'}
          </p>
        ) : (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about your project"
            className="w-full h-32 px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC] resize-none"
          />
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium">Start Date*</label>
          {isReadOnly ? (
            <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
              {startDate || '-'}
            </p>
          ) : (
            <div
              onClick={() => !isReadOnly && openDatePicker('start')}
              className={`w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white min-h-[42px] flex items-center justify-between ${
                !isReadOnly
                  ? 'cursor-pointer hover:border-[#9C39FC] transition-colors'
                  : ''
              }`}
            >
              <span className={startDate ? 'text-white' : 'text-[#6A7282]'}>
                {startDate || 'e.g., Nov 15, 2025'}
              </span>
              {!startDate && !isReadOnly && (
                <ChevronDown className="h-4 w-4 text-[#6A7282]" />
              )}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#F9FAFB]">
            Completed Date (Optional)
          </label>
          {isReadOnly ? (
            <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
              {completedDate || '-'}
            </p>
          ) : (
            <div
              onClick={() => !isReadOnly && openDatePicker('complete')}
              className={`w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white min-h-[42px] flex items-center justify-between ${
                !isReadOnly
                  ? 'cursor-pointer hover:border-[#9C39FC] transition-colors'
                  : ''
              }`}
            >
              <span className={completedDate ? 'text-white' : 'text-[#6A7282]'}>
                {completedDate || 'e.g., Dec 15, 2025'}
              </span>
              {!completedDate && !isReadOnly && (
                <ChevronDown className="h-4 w-4 text-[#6A7282]" />
              )}
            </div>
          )}
        </div>
      </div>

      <DatePickerDialog
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        selectedDate={
          activeDateField === 'start'
            ? startDate
              ? new Date(startDate)
              : null
            : completedDate
              ? new Date(completedDate)
              : null
        }
        onSelect={(date) => {
          if (activeDateField === 'start') {
            setStartDate(date);
          } else {
            setCompletedDate(date);
          }
        }}
      />
    </div>
  );
};
