import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { List, Plus, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusDropdown, { type DropdownItem } from './status-dropdown';

const PortfolioCreateForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<DropdownItem | null>(null);

  const statusOptions = [
    { id: 1, name: 'Completed' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Unqualified' },
  ];

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto">
        {/* Header */}

        <div className="bg-slate-900 rounded-lg border border-[#FFFFFF]/15 p-6 space-y-6">
          <h1 className="text-xl font-semibold">Create Portfolio</h1>
          <div className="h-px bg-[#FFFFFF]/15" />
          {/* Project Basic Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Project Basic Information</h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Upload */}
              <div className="flex-shrink-0">
                <FileUpload className="w-[153px] h-[153px] bg-[#0F172B]/60 border rounded-lg cursor-pointer hover:bg-[#FFFFFF20]" />
              </div>

              {/* Form Fields */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-[#F9FAFB]">
                    Project Name*
                  </label>
                  <InputField placeholder="Enter your project name" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#F9FAFB]">
                    Status
                  </label>
                  <StatusDropdown
                    placeholder="Select current status"
                    menuList={statusOptions}
                    selectedValue={status}
                    onChange={setStatus}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-[#F9FAFB]">
                Project Descriptions
              </label>
              <FormTextArea
                placeholder="Provide details about your project"
                className="h-32 flex w-full text-[#6A7282] px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#F9FAFB]">
                  Start Date*
                </label>
                <div className="relative">
                  <InputField
                    type="date"
                    placeholder="Select start date"
                    className="w-full text-gray-400"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#F9FAFB]">
                  Completed Date (Optional)
                </label>
                <div className="relative">
                  <InputField
                    type="date"
                    placeholder="Select completed date"
                    className="w-full text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#FFFFFF]/15" />

          {/* Team Management */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Team Management</h2>
              <div className="flex gap-3">
                <Button className="text-[#99A1AF] border border-[#FFFFFF]/15 text-lg font-medium rounded-lg hover:bg-white/10 bg-transparent px-3 py-1.5 flex gap-1 items-center">
                  <List className="h-6 w-6" />
                  List View
                </Button>
                <Button className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1">
                  <Plus size={18} />
                  Add Team
                </Button>
              </div>
            </div>
            {/* Team list placeholder or empty state could go here */}
          </div>

          <div className="h-px bg-[#FFFFFF]/15" />

          {/* Attachment */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Attachment</h2>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-[#F9FAFB]">
                Add Link of your project
              </label>
              <InputField placeholder="http://" />
            </div>

            <div className="border-2 border-dashed border-[#FFFFFF26] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#FFFFFF05] transition-colors cursor-pointer bg-[#FFFFFF17]">
              <div className="bg-[#FFFFFF17] p-3 rounded-full mb-3">
                <Upload className="text-gray-400" size={24} />
              </div>
              <p className="text-sm text-gray-400">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>

          <div className="h-px bg-[#FFFFFF]/15" />

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              className="text-white border border-[#FFFFFF]/15 hover:bg-white/10 px-8 bg-transparent"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB]">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCreateForm;
