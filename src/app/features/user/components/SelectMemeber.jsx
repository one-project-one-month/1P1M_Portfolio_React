import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { plusIconUrl } from "@/assets/icons/iconUrls";

const SelectMemeber = ({handleSaveMembers,handleDiscardMembers,filteredDevs=[],devError,devLoading,search,selectedMembers,isDialogOpen,handleDialog,handleRemoveMember,handleAddMember,handleAddTeamMember}) => {
  return (
    <div className="flex flex-col mb-2 -mt-4 z-0">
          <div className="flex items-center gap-2">
            {/* Team Member Images - Show max 5 */}
            {selectedMembers.slice(0, 5).map((member, index) => (
              <div
                key={`member-${
                  member.dev_id || member.userId || member.id || index
                }`}
                className="relative group"
              >
                <img
                  src={
                    member.profilePictureUrl ||
                    `https://picsum.photos/48/48?random=${
                      member.dev_id || member.id
                    }`
                  }
                  alt={member.name || `Team member ${index + 1}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400 transition-colors cursor-pointer"
                  title={member.name || "Team member"}
                />
              </div>
            ))}

            {selectedMembers.length > 5 && (
              <div
                key="more-members-indicator"
                className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <span className="text-white text-xs font-semibold">
                  +{selectedMembers.length - 5}
                </span>
              </div>
            )}

            {selectedMembers.length === 0 && (
              <div className="text-gray-400 text-sm">
                No team members selected
              </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={handleDialog}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-600 transition-colors flex items-center justify-center cursor-pointer text-white font-bold text-4xl"
                  onClick={handleAddTeamMember}
                >
                  <img src={plusIconUrl} alt="" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#1A1A1A] border border-[#3A3A3A] rounded-3xl p-8">
                <DialogHeader className="flex flex-row justify-between items-center">
                  <DialogTitle className="text-white text-xl font-semibold">
                    Add Member
                  </DialogTitle>
                  <button
                    onClick={() => handleDialog}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                   X
                  </button>
                </DialogHeader>

                <div className="space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Search member..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-12 rounded-lg border border-[#FFFFFF26] bg-[#FFFFFF17] px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  {selectedMembers.length > 0 && (
                    <CustomBox
                      style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "12px",
                        overflowY: "auto",
                        alignContent: "flex-start",
                        boxSizing: "border-box",
                      }}
                    >
                      {selectedMembers.map((member, index) => (
                        <div
                          key={`selected-member-${
                            member.dev_id || member.userId || member.id || index
                          }`}
                          className="flex items-center justify-between bg-gray-800 border border-gray-600 rounded-lg p-2 gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                member.profilePictureUrl ||
                                `https://picsum.photos/40/40?random=${
                                  member.dev_id || member.id
                                }`
                              }
                              alt={member.name || "User"}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <p className="text-white text-sm font-medium truncate max-w-[120px]">
                              {member.name || "Unknown User"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveMember(member)}
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <X size={12} className="text-black" />
                          </button>
                        </div>
                      ))}
                    </CustomBox>
                  )}
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {devLoading ? (
                      <p className="text-gray-400 text-center py-4">
                        Loading developers...
                      </p>
                    ) : devError ? (
                      <p className="text-red-400 text-center py-4">
                        Error loading developers: {devError}
                      </p>
                    ) : filteredDevs.length === 0 ? (
                      <div className="text-gray-400 text-center py-4">
                        {search ? (
                          <div>
                            <p>No members found for "{search}"</p>
                            <p className="text-xs mt-1">
                              Found {devProfiles.length} total results,{" "}
                              {selectedMembers.length} already selected
                            </p>
                          </div>
                        ) : (
                          "Type a name to search"
                        )}
                      </div>
                    ) : (
                      filteredDevs.map((dev, index) => (
                        <div
                          key={`search-result-${
                            dev.dev_id || dev.userId || dev.id || index
                          }`}
                          className="flex items-center justify-between bg-gray-800 border border-gray-600 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                dev.profilePictureUrl ||
                                `https://picsum.photos/40/40?random=${
                                  dev.dev_id || dev.id
                                }`
                              }
                              alt={dev.name || "User"}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-white font-medium">
                                {dev.name || "Unknown User"}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {dev.email || "No email"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddMember(dev)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  ={" "}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={handleDiscardMembers}
                      className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleSaveMembers}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
  )
}

export default SelectMemeber