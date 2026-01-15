import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { useClickOutside } from '@/hooks/use-click-outside';
import type { TeamType } from '@/types/portfolio-management';
import { Edit2, List, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusOptions } from '../constants';
import StatusDropdown, { type DropdownItem } from './status-dropdown';
import TeamDropdown from './team-dropdown';

const PortfolioCreateForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<DropdownItem | null>(null);

  // Team Management State
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [addedTeams, setAddedTeams] = useState<TeamType[]>([]);
  const teamDropdownRef = useClickOutside<HTMLDivElement>(() =>
    setIsTeamDropdownOpen(false),
  );

  const handleAddTeam = (teamName: string) => {
    if (!addedTeams.find((team) => team.name === teamName)) {
      setAddedTeams([
        ...addedTeams,
        { id: crypto.randomUUID(), name: teamName, count: 0 },
      ]);
    }
    setIsTeamDropdownOpen(false);
  };

  const handleRemoveTeam = (id: string) => {
    setAddedTeams(addedTeams.filter((team) => team.id !== id));
  };

  return (
    <div className="max-h-screen text-[#F9FAFB]">
      <div className="mx-auto">
        {/* Header */}

        <div className="bg-slate-900 rounded-lg border border-[#FFFFFF]/15 p-6 flex flex-col h-[85vh]">
          <h1 className="text-xl font-semibold mb-6">Create Portfolio</h1>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
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
                    <label className="text-sm font-medium">Project Name*</label>
                    <InputField
                      className="text-sm text-[#6A7282]"
                      placeholder="Enter your project name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <StatusDropdown
                      placeholder="Select current status"
                      menuList={statusOptions}
                      selectedValue={status}
                      onChange={setStatus}
                      className="text-sm text-[#6A7282]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Project Descriptions
                </label>
                <FormTextArea
                  placeholder="Provide details about your project"
                  className="h-32 flex w-full text-sm text-[#6A7282] px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Start Date*</label>
                  <div className="relative">
                    <InputField
                      type="date"
                      placeholder="Select start date"
                      className="w-full text-sm text-[#6A7282]"
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
                      className="w-full text-sm text-[#6A7282]"
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
                <div className="flex gap-3 relative" ref={teamDropdownRef}>
                  <Button className="text-[#99A1AF] border border-[#FFFFFF]/15 text-lg font-medium rounded-lg hover:bg-white/10 bg-transparent px-3 py-1.5 flex gap-1 items-center">
                    <List className="h-6 w-6" />
                    List View
                  </Button>
                  <Button
                    className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1 relative"
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  >
                    <Plus size={18} />
                    Add Team
                  </Button>

                  {isTeamDropdownOpen && (
                    <TeamDropdown onAddTeam={handleAddTeam} />
                  )}
                </div>
              </div>

              {/* Added Teams List */}
              <div className="space-y-3">
                {addedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="bg-[#1e293b] rounded-lg p-4 flex items-center justify-between group border border-[#FFFFFF]/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-200 font-medium">
                        {team.name}
                      </span>
                      <span className="bg-[#334155] text-gray-300 text-xs px-2 py-0.5 rounded">
                        {team.count}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-[#334155] text-gray-400 hover:text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="p-1.5 rounded-md hover:bg-[#334155] text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => handleRemoveTeam(team.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <button className="h-8 w-8 rounded-full bg-[#334155] flex items-center justify-center text-gray-300 hover:bg-[#475569] hover:text-white transition-colors ml-4">
                      <Plus size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#FFFFFF]/15" />

            {/* Attachment */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Attachment</h2>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-[#F9FAFB]">
                  Add Link of your project
                </label>
                <InputField
                  className="text-sm text-[#6A7282]"
                  placeholder="http://"
                />
              </div>

              <div className="border-2 border-dashed border-[#FFFFFF26] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#FFFFFF05] transition-colors cursor-pointer bg-[#FFFFFF17]">
                <div className="bg-[#FFFFFF17] p-3 rounded-full mb-3">
                  <Upload className="text-gray-400" size={24} />
                </div>
                <p className="text-sm text-[#6A7282]">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-[#6A7282] mt-1">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>

            <div className="h-px bg-[#FFFFFF]/15" />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-6">
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
